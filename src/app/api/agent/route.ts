import { NextResponse } from "next/server";

import constants from "../../../../constants";
import agentConfig from "@/config/agent";
import buildAgentSystemPrompt from "@/lib/agent/prompt";
import createAgentProvider from "@/lib/agent/provider";
import guardrails from "@/lib/agent/guardrails";
import parseAgentRequest from "@/lib/agent/validation";
import createGuardrailResponse from "@/app/api/agent/utils/createGuardrailResponse";
import createMinuteRateLimiter from "@/app/api/agent/utils/createMinuteRateLimiter";
import createSessionQuestionLimiter from "@/app/api/agent/utils/createSessionQuestionLimiter";
import getClientId from "@/app/api/agent/utils/getClientId";

const encoder = new TextEncoder();

const streamHeaders = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
};

const makeTextStream = (text: string): ReadableStream =>
  new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

const isRateLimited = createMinuteRateLimiter(agentConfig.rateLimitPerMinute);
const consumeSessionQuestion = createSessionQuestionLimiter(
  agentConfig.maxQuestionsPerSession,
  agentConfig.sessionWindowMs,
);

export async function POST(request: Request) {
  const startedAt = Date.now();

  if (!agentConfig.featureEnabled) {
    return NextResponse.json({ error: "Agent is disabled" }, { status: 404 });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("[agent] Missing OPENAI_API_KEY");
    return NextResponse.json({ error: "Agent is unavailable" }, { status: 503 });
  }

  const clientId = getClientId(request);
  if (isRateLimited(clientId)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const parsed = parseAgentRequest(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const trimmedMessages = parsed.data.messages.slice(-agentConfig.maxConversationMessages);
  const latestUserMessage = [...trimmedMessages].reverse().find((message) => message.role === "user");
  if (!latestUserMessage) {
    return NextResponse.json({ error: "No user message found" }, { status: 400 });
  }

  if (!guardrails.isAllowedAgentTopic(latestUserMessage.content)) {
    return createGuardrailResponse(guardrails.outOfScopeMessage);
  }

  const sessionKey = parsed.data.sessionId?.trim() || clientId;
  const questionCheck = consumeSessionQuestion(sessionKey);
  if (!questionCheck.allowed) {
    return createGuardrailResponse(guardrails.interactionLimitMessage);
  }

  try {
    const provider = createAgentProvider();
    const generator = provider.generateReplyStream({
      messages: trimmedMessages,
      systemPrompt: buildAgentSystemPrompt(),
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of generator) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
          }
          const latencyMs = Date.now() - startedAt;
          console.info(`[agent] stream ok latencyMs=${latencyMs}`);
        } catch (err) {
          const latencyMs = Date.now() - startedAt;
          console.error("[agent] stream_error", {
            latencyMs,
            error: err instanceof Error ? err.message : "unknown",
          });
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: constants.agent.fallbackMessage })}\n\n`),
          );
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: streamHeaders });
  } catch (error) {
    const latencyMs = Date.now() - startedAt;
    console.error("[agent] provider_error", {
      latencyMs,
      error: error instanceof Error ? error.message : "unknown",
    });

    return new Response(makeTextStream(constants.agent.fallbackMessage), { headers: streamHeaders });
  }
}
