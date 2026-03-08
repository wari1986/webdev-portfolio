import { describe, expect, it } from "vitest";

import agentConfig from "@/config/agent";
import parseAgentRequest from "@/lib/agent/validation";

describe("parseAgentRequest", () => {
  it("accepts valid payload", () => {
    const parsed = parseAgentRequest({
      messages: [{ role: "user", content: "Tell me about projects" }],
      sessionId: "abc",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid payload", () => {
    const parsed = parseAgentRequest({
      messages: [{ role: "system", content: "bad" }],
    });

    expect(parsed.success).toBe(false);
  });

  it("accepts histories larger than the runtime trim size", () => {
    const parsed = parseAgentRequest({
      messages: Array.from({ length: agentConfig.maxConversationMessages + 1 }, (_, index) => ({
        role: "user" as const,
        content: `question-${index}`,
      })),
    });

    expect(parsed.success).toBe(true);
  });
});
