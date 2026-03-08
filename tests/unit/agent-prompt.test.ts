import { describe, expect, it } from "vitest";

import buildAgentSystemPrompt from "@/lib/agent/prompt";

describe("buildAgentSystemPrompt", () => {
  it("includes required context sections", () => {
    const prompt = buildAgentSystemPrompt();

    expect(prompt).toContain("[BIO]");
    expect(prompt).toContain("[SKILLS]");
    expect(prompt).toContain("[PROJECTS & WORK]");
    expect(prompt).toContain("[EXPERIENCE]");
    expect(prompt).toContain("[CURRENT_FOCUS]");
  });
});
