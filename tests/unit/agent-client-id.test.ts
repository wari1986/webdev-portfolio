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

  it("uses x-forwarded-for when edge headers are unavailable", () => {
    const request = new Request("https://example.com", {
      headers: {
        "x-forwarded-for": "1.2.3.4, 5.6.7.8",
      },
    });

    expect(getClientId(request)).toBe("1.2.3.4");
  });

  it("uses a non-constant anonymous fingerprint fallback", () => {
    const firstRequest = new Request("https://example.com", {
      headers: {
        "user-agent": "Mozilla/5.0",
        "accept-language": "en-US",
      },
    });
    const secondRequest = new Request("https://example.com", {
      headers: {
        "user-agent": "Mozilla/5.0 (Mobile)",
        "accept-language": "en-US",
      },
    });

    expect(getClientId(firstRequest)).toMatch(/^anon:[a-f0-9]{24}$/);
    expect(getClientId(secondRequest)).toMatch(/^anon:[a-f0-9]{24}$/);
    expect(getClientId(firstRequest)).not.toBe(getClientId(secondRequest));
  });

  it("keeps fallback fingerprints deterministic for identical request headers", () => {
    const firstRequest = new Request("https://example.com", {
      headers: {
        "user-agent": "Mozilla/5.0",
        "accept-language": "en-US",
        cookie: "session=abc123",
      },
    });
    const secondRequest = new Request("https://example.com", {
      headers: {
        "user-agent": "Mozilla/5.0",
        "accept-language": "en-US",
        cookie: "session=abc123",
      },
    });

    expect(getClientId(firstRequest)).toBe(getClientId(secondRequest));
  });
});
