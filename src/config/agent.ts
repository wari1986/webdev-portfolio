import constants from "../../constants";

const parseFiniteNumber = (value: string | undefined, fallback: number, minimum: number) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
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
  rateLimitPerMinute: parseFiniteNumber(
    process.env.AGENT_RATE_LIMIT_PER_MIN,
    constants.agent.defaults.rateLimitPerMinute,
    1,
  ),
  maxQuestionsPerSession: parseFiniteNumber(
    process.env.AGENT_MAX_QUESTIONS_PER_SESSION,
    constants.agent.defaults.maxQuestionsPerSession,
    1,
  ),
  sessionWindowMs: parseFiniteNumber(process.env.AGENT_SESSION_WINDOW_MS, constants.agent.defaults.sessionWindowMs, 1),
  contextVersion: constants.agent.defaults.contextVersion,
} as const;

export default agentConfig;
