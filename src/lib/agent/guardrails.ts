import constants from "../../../constants";

const isGreeting = (normalized: string) =>
  constants.agent.greetingPatterns.some((pattern) => normalized === pattern);

const isAllowedAgentTopic = (question: string) => {
  const normalized = question.toLowerCase().trim();

  // Injection attempts are rejected first, before any keyword pass
  if (constants.agent.blockedInjectionPatterns.some((p) => normalized.includes(p))) {
    return false;
  }

  if (isGreeting(normalized)) {
    return true;
  }

  if (constants.agent.directIntroPatterns.some((p) => normalized.includes(p))) {
    return true;
  }

  if (
    constants.agent.topicKeywords.some((kw) => {
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(?<![a-z])${escaped}(?![a-z])`).test(normalized);
    })
  ) {
    return true;
  }

  // Explicit off-topic domains are rejected
  if (constants.agent.blockedTopicPatterns.some((p) => normalized.includes(p))) {
    return false;
  }

  // Default: deny — keeps the agent scoped to portfolio topics
  return false;
};

const guardrails = {
  isAllowedAgentTopic,
  outOfScopeMessage: constants.agent.outOfScopeMessage,
  interactionLimitMessage: constants.agent.interactionLimitMessage,
};

export default guardrails;
