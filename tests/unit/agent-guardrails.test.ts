import { describe, expect, it } from "vitest";

import guardrails from "@/lib/agent/guardrails";

describe("isAllowedAgentTopic", () => {
  it("allows in-scope portfolio questions", () => {
    expect(guardrails.isAllowedAgentTopic("What projects are you building right now?")).toBe(true);
    expect(guardrails.isAllowedAgentTopic("What technologies do you use in your stack?")).toBe(true);
  });

  it("blocks out-of-scope questions", () => {
    expect(guardrails.isAllowedAgentTopic("What is the weather in Tokyo tomorrow?")).toBe(false);
    expect(guardrails.isAllowedAgentTopic("Write me a poem about Mars.")).toBe(false);
  });
});
