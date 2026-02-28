import { describe, expect, test } from "vitest";

import {
  applyLensDistortion,
  layeredField,
  mapIntensityToChar,
  shouldAnimate,
} from "@/lib/canvas/asciiEngine";
import { asciiEngineConfig } from "@/lib/content/siteContent";

describe("ascii engine", () => {
  test("maps intensity buckets to charset deterministically", () => {
    const chars = ".:;il1tfxX08#@";
    expect(mapIntensityToChar(0, chars)).toBe(".");
    expect(mapIntensityToChar(0.5, chars)).toBe("t");
    expect(mapIntensityToChar(1, chars)).toBe("@");
  });

  test("lens distortion changes point inside radius", () => {
    const result = applyLensDistortion(120, 120, 100, 100, 50);
    expect(result.x).not.toBe(120);
    expect(result.y).not.toBe(120);
    expect(result.strength).toBeGreaterThan(0);
  });

  test("field values remain bounded", () => {
    const value = layeredField(0.4, 0.7, 1000, asciiEngineConfig);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);
  });

  test("animation gate respects reduced motion and page visibility", () => {
    expect(shouldAnimate(false, true)).toBe(true);
    expect(shouldAnimate(true, true)).toBe(false);
    expect(shouldAnimate(false, false)).toBe(false);
  });
});
