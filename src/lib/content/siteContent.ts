import { AsciiEngineConfig, SiteContent } from "@/types/site";

export const siteContent: SiteContent = {
  brand: "kozmanishvili",
  routeLabel: "Explore More 2",
  title: "System Architecture & Visual Displacement",
  subtitle: "Exploring the delta between signal and noise.",
  authorMeta: "SANDRO KOZMANISHVILI   20:20:17 UTC+4",
  authorDescription:
    "Multidisciplinary designer based in Tbilisi. Focusing on the intersection of generative visuals and functional interfaces.",
  statusLine: "Currently building visual video sound and digital products.",
  utilityCounters: [
    { id: "bookmark", icon: "bookmark", value: 1 },
    { id: "heart", icon: "heart", value: 266 },
  ],
  socialLinks: [
    { id: "email", label: "Email", href: "mailto:hello@example.dev", external: true },
    { id: "github", label: "GitHub", href: "https://github.com", external: true },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com", external: true },
    { id: "x", label: "X / Twitter", href: "https://x.com", external: true },
  ],
  monogramLeft: "S",
  monogramRight: "K",
  year: "© 2026",
  indexLabel: "0",
  debugLabel: "RENDER: 2.6ms   X: 725 Y: 538",
};

export const asciiEngineConfig: AsciiEngineConfig = {
  cellSize: 12,
  charset: ".:;il1tfxX08#@",
  noiseScale: 0.013,
  animationSpeed: 0.0009,
  lensRadius: 56,
  dprCap: 2,
};
