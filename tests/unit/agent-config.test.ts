import { afterEach, describe, expect, it, vi } from "vitest";

import constants from "../../constants";

const ENV_KEYS = [
  "AGENT_RATE_LIMIT_PER_MIN",
  "AGENT_MAX_QUESTIONS_PER_SESSION",
  "AGENT_SESSION_WINDOW_MS",
] as const;

const clearAgentEnv = () => {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
};

const loadAgentConfig = async () => {
  vi.resetModules();
  const importedModule = await import("@/config/agent");
  return importedModule.default;
};

describe("agentConfig numeric limits", () => {
  afterEach(() => {
    clearAgentEnv();
  });

  it("falls back to defaults when env values are malformed", async () => {
    process.env.AGENT_RATE_LIMIT_PER_MIN = "20/min";
    process.env.AGENT_MAX_QUESTIONS_PER_SESSION = "five";
    process.env.AGENT_SESSION_WINDOW_MS = "30s";

    const agentConfig = await loadAgentConfig();

    expect(agentConfig.rateLimitPerMinute).toBe(constants.agent.defaults.rateLimitPerMinute);
    expect(agentConfig.maxQuestionsPerSession).toBe(constants.agent.defaults.maxQuestionsPerSession);
    expect(agentConfig.sessionWindowMs).toBe(constants.agent.defaults.sessionWindowMs);
  });

  it("uses numeric env values when they are valid", async () => {
    process.env.AGENT_RATE_LIMIT_PER_MIN = "15";
    process.env.AGENT_MAX_QUESTIONS_PER_SESSION = "8";
    process.env.AGENT_SESSION_WINDOW_MS = "1800000";

    const agentConfig = await loadAgentConfig();

    expect(agentConfig.rateLimitPerMinute).toBe(15);
    expect(agentConfig.maxQuestionsPerSession).toBe(8);
    expect(agentConfig.sessionWindowMs).toBe(1_800_000);
  });
});
