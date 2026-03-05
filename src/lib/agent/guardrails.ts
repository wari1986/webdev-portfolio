import constants from "../../../constants";

const isAllowedAgentTopic = (question: string) => {
  const normalized = question.toLowerCase();

  const hasDirectIntro = constants.agent.directIntroPatterns.some((pattern) => normalized.includes(pattern));
  if (hasDirectIntro) {
    return true;
  }

  return constants.agent.topicKeywords.some((keyword) => normalized.includes(keyword));
};

const guardrails = {
  isAllowedAgentTopic,
  outOfScopeMessage: constants.agent.outOfScopeMessage,
  interactionLimitMessage: constants.agent.interactionLimitMessage,
};

export default guardrails;
