import agentConfig from "@/config/agent";
import { AgentProvider, AgentProviderInput, AgentProviderOutput } from "@/types/agent";
import extractAssistantText from "@/lib/agent/utils/extractAssistantText";
import mapOpenAIInput from "@/lib/agent/utils/mapOpenAIInput";

type OpenAIResponse = {
  model?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";

class OpenAIAgentProvider implements AgentProvider {
  private getApiKey(): string {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is missing");
    return apiKey;
  }

  private buildBody(input: AgentProviderInput, extra?: Record<string, unknown>): string {
    return JSON.stringify({
      model: agentConfig.model,
      input: mapOpenAIInput(input),
      max_output_tokens: agentConfig.maxOutputTokens,
      temperature: agentConfig.temperature,
      top_p: agentConfig.topP,
      ...extra,
    });
  }

  async generateReply(input: AgentProviderInput): Promise<AgentProviderOutput> {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getApiKey()}`,
      },
      body: this.buildBody(input),
    });

    if (!response.ok) {
      throw new Error(`OpenAI provider failed with status ${response.status}`);
    }

    const payload = (await response.json()) as OpenAIResponse;

    return {
      content: extractAssistantText(payload),
      model: payload.model ?? agentConfig.model,
    };
  }

  async *generateReplyStream(input: AgentProviderInput): AsyncGenerator<string> {
    // Use /v1/chat/completions for streaming — well-documented SSE format
    const messages = [
      { role: "system", content: input.systemPrompt },
      ...input.messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const response = await fetch(OPENAI_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getApiKey()}`,
      },
      body: JSON.stringify({
        model: agentConfig.model,
        messages,
        max_tokens: agentConfig.maxOutputTokens,
        temperature: agentConfig.temperature,
        top_p: agentConfig.topP,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI stream failed with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") return;
        try {
          const event = JSON.parse(data) as { choices?: Array<{ delta?: { content?: string } }> };
          const chunk = event.choices?.[0]?.delta?.content;
          if (typeof chunk === "string" && chunk.length > 0) {
            yield chunk;
          }
        } catch {
          // skip unparseable lines
        }
      }
    }
  }
}

const createAgentProvider = (): AgentProvider => {
  return new OpenAIAgentProvider();
};

export default createAgentProvider;
