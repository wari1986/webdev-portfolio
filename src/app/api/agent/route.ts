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
    return createGuardrailResponse(guardrails.outOfScopeMessage, agentConfig.model, agentConfig.contextVersion);
  }

  const sessionKey = parsed.data.sessionId?.trim() || clientId;
  const questionCheck = consumeSessionQuestion(sessionKey);
  if (!questionCheck.allowed) {
    return createGuardrailResponse(guardrails.interactionLimitMessage, agentConfig.model, agentConfig.contextVersion);
  }

  try {
    const provider = createAgentProvider();
    const reply = await provider.generateReply({
      messages: trimmedMessages,
      systemPrompt: buildAgentSystemPrompt(),
    });

    const latencyMs = Date.now() - startedAt;

    console.info(`[agent] ok model=${reply.model} latencyMs=${latencyMs}`);

    return NextResponse.json({
      message: {
        role: "assistant",
        content: reply.content,
      },
      meta: {
        model: reply.model,
        latencyMs,
        contextVersion: agentConfig.contextVersion,
      },
    });
  } catch (error) {
    const latencyMs = Date.now() - startedAt;
    console.error("[agent] provider_error", {
      latencyMs,
      error: error instanceof Error ? error.message : "unknown",
    });

    return NextResponse.json(
      {
        message: {
          role: "assistant",
          content: constants.agent.fallbackMessage,
        },
        meta: {
          model: agentConfig.model,
          latencyMs,
          contextVersion: agentConfig.contextVersion,
        },
      },
      { status: 200 },
    );
  }
}
