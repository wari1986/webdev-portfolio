import { describe, expect, it } from "vitest";

import extractAssistantText from "@/lib/agent/utils/extractAssistantText";

describe("agent provider mapper", () => {
  it("extracts output_text from response payload", () => {
    const text = extractAssistantText({
      output: [
        {
          type: "message",
          content: [
            { type: "output_text", text: "Hello" },
            { type: "output_text", text: "world" },
          ],
        },
      ],
    });

    expect(text).toBe("Hello\nworld");
  });

  it("returns fallback when no text exists", () => {
    const text = extractAssistantText({ output: [] });

    expect(text).toContain("I don't have enough context");
  });
});
