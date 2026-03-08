import { describe, expect, it } from "vitest";

import getClientId from "@/app/api/agent/utils/getClientId";

describe("getClientId", () => {
  it("uses x-real-ip when available", () => {
    const request = new Request("https://example.com", {
      headers: {
        "x-real-ip": "198.51.100.10",
      },
    });

    expect(getClientId(request)).toBe("198.51.100.10");
  });

  it("falls back to cf-connecting-ip", () => {
    const request = new Request("https://example.com", {
      headers: {
        "cf-connecting-ip": "203.0.113.5",
      },
    });

    expect(getClientId(request)).toBe("203.0.113.5");
  });

  it("ignores x-forwarded-for", () => {
    const request = new Request("https://example.com", {
      headers: {
        "x-forwarded-for": "1.2.3.4, 5.6.7.8",
      },
    });

    expect(getClientId(request)).toBe("anonymous");
  });
});
