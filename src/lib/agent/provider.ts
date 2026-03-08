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

const OPENAI_API_URL = "https://api.openai.com/v1/responses";

class OpenAIAgentProvider implements AgentProvider {
  async generateReply(input: AgentProviderInput): Promise<AgentProviderOutput> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: agentConfig.model,
        input: mapOpenAIInput(input),
        max_output_tokens: agentConfig.maxOutputTokens,
        temperature: agentConfig.temperature,
        top_p: agentConfig.topP,
      }),
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
}

const createAgentProvider = (): AgentProvider => {
  return new OpenAIAgentProvider();
};

export default createAgentProvider;
