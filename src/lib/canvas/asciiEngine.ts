import { AsciiEngineConfig } from "@/types/site";

const TAU = Math.PI * 2;

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export const mapIntensityToChar = (intensity: number, charset: string) => {
  const safe = charset.length > 0 ? charset : ".";
  const normalized = clamp(intensity, 0, 1);
  const index = Math.floor(normalized * (safe.length - 1));
  return safe[index] ?? safe[safe.length - 1] ?? ".";
};

export const hashNoise = (x: number, y: number, t: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + t * 269.5) * 43758.5453123;
  return n - Math.floor(n);
};

export const smoothNoise = (x: number, y: number, t: number) => {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const sx = x - x0;
  const sy = y - y0;

  const n00 = hashNoise(x0, y0, t);
  const n10 = hashNoise(x1, y0, t);
  const n01 = hashNoise(x0, y1, t);
  const n11 = hashNoise(x1, y1, t);

  const ix0 = n00 + (n10 - n00) * sx;
  const ix1 = n01 + (n11 - n01) * sx;
  return ix0 + (ix1 - ix0) * sy;
};

export const layeredField = (x: number, y: number, time: number, config: AsciiEngineConfig) => {
  const t = time * config.animationSpeed;
  const nx = x * config.noiseScale;
  const ny = y * config.noiseScale;

  const slow = smoothNoise(nx * 0.9, ny * 0.9, t * 0.16);
  const mid = smoothNoise(nx * 1.7, ny * 1.3, t * 0.34);
  const fast = smoothNoise(nx * 3.3, ny * 2.8, t * 0.56);

  // Create a drifting x-driven skyline and fill it with local texture.
  const terrainA = smoothNoise(nx * 0.42, 1.73, t * 0.11);
  const terrainB = smoothNoise(nx * 0.88, 7.41, t * 0.19);
  const undulate = 0.5 + 0.5 * Math.sin((x * 0.013 + t * 0.2) * TAU);
  const ridgeLine = 0.62 + (terrainA - 0.5) * 0.22 + (terrainB - 0.5) * 0.1 + (undulate - 0.5) * 0.08;

  const above = Math.max(0, ridgeLine - y);
  const below = Math.max(0, y - ridgeLine);
  const crest = Math.exp(-above * 16);
  const body = below > 0 ? Math.exp(-below * 5.4) : 0;
  const profile = clamp(crest * 0.68 + body * 0.94, 0, 1);

  const texture = 0.36 * slow + 0.36 * mid + 0.28 * fast;
  const granular = 1 - Math.abs(2 * fast - 1);
  const peaks = Math.pow(clamp(granular * profile, 0, 1), 1.35);
  const value = profile * texture * 0.86 + peaks * 0.5;
  return clamp(value, 0, 1);
};

export const applyLensDistortion = (x: number, y: number, lensX: number, lensY: number, radius: number) => {
  const dx = x - lensX;
  const dy = y - lensY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > radius) {
    return { x, y, strength: 0 };
  }

  const normalized = 1 - dist / radius;
  const eased = normalized * normalized * (3 - 2 * normalized);
  const safeDist = dist === 0 ? 1 : dist;
  const unitX = dx / safeDist;
  const unitY = dy / safeDist;

  const radialPull = radius * 0.48 * eased;
  const pullX = unitX * radialPull;
  const pullY = unitY * radialPull;

  return {
    x: x - pullX,
    y: y - pullY,
    strength: eased,
  };
};

export const computeDpr = (devicePixelRatio: number, cap: number) => clamp(devicePixelRatio, 1, cap);

export const shouldAnimate = (reducedMotion: boolean, pageVisible: boolean) => !reducedMotion && pageVisible;
