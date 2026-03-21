import constants from "../../constants";

const parsePositiveInteger = (value: string | undefined, fallback: number, minimum: number) => {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim();
  if (!/^\d+$/.test(normalized)) {
    return fallback;
  }

  const parsed = Number.parseInt(normalized, 10);
  if (!Number.isFinite(parsed) || parsed < minimum) {
    return fallback;
  }

  return parsed;
};

const agentConfig = {
  featureEnabled: process.env.NEXT_PUBLIC_AGENT_ENABLED === "true",
  model: process.env.OPENAI_MODEL ?? constants.agent.defaults.model,
  maxConversationMessages: constants.agent.defaults.maxConversationMessages,
  maxInputChars: constants.agent.defaults.maxInputChars,
  maxOutputTokens: constants.agent.defaults.maxOutputTokens,
  temperature: constants.agent.defaults.temperature,
  topP: constants.agent.defaults.topP,
  rateLimitPerMinute: parsePositiveInteger(
    process.env.AGENT_RATE_LIMIT_PER_MIN,
    constants.agent.defaults.rateLimitPerMinute,
    1,
  ),
  maxQuestionsPerSession: parsePositiveInteger(
    process.env.AGENT_MAX_QUESTIONS_PER_SESSION,
    constants.agent.defaults.maxQuestionsPerSession,
    1,
  ),
  sessionWindowMs: parsePositiveInteger(process.env.AGENT_SESSION_WINDOW_MS, constants.agent.defaults.sessionWindowMs, 1),
  contextVersion: constants.agent.defaults.contextVersion,
} as const;

export default agentConfig;
