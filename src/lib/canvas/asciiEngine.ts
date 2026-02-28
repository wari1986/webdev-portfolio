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
  const nx = x * config.noiseScale;
  const ny = y * config.noiseScale;

  const slow = smoothNoise(nx * 0.9, ny * 0.9, time * config.animationSpeed * 0.3);
  const mid = smoothNoise(nx * 1.7, ny * 1.3, time * config.animationSpeed * 0.75);
  const fast = smoothNoise(nx * 3.3, ny * 2.8, time * config.animationSpeed * 1.25);

  // Shape field into a horizontal ribbon/mound profile.
  const profile = Math.exp(-Math.abs(y - 0.62) * 4.8);
  const wave = 0.5 + 0.5 * Math.sin((x * 0.018 + time * 0.0018) * TAU);

  const value = profile * (0.45 * slow + 0.35 * mid + 0.2 * fast) + 0.22 * wave * profile;
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
  const radialPull = normalized * normalized * 18;
  const safeDist = dist === 0 ? 1 : dist;
  const pullX = (dx / safeDist) * radialPull;
  const pullY = (dy / safeDist) * radialPull;

  return {
    x: x - pullX,
    y: y - pullY,
    strength: normalized,
  };
};

export const computeDpr = (devicePixelRatio: number, cap: number) => clamp(devicePixelRatio, 1, cap);

export const shouldAnimate = (reducedMotion: boolean, pageVisible: boolean) => !reducedMotion && pageVisible;
