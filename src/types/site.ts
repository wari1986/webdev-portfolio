export type SocialLink = {
  id: string;
  label: string;
  href: string;
  external: boolean;
};

export type UtilityCounter = {
  id: string;
  icon: "bookmark" | "heart";
  value: number;
};

export type SiteContent = {
  brand: string;
  title: string;
  subtitle: string;
  authorMeta: string;
  authorDescription: string;
  statusLine: string;
  utilityCounters: UtilityCounter[];
  socialLinks: SocialLink[];
  monogramLeft: string;
  monogramRight: string;
  year: string;
  indexLabel: string;
  debugLabel: string;
  routeLabel: string;
};

export type AsciiEngineConfig = {
  cellSize: number;
  charset: string;
  noiseScale: number;
  animationSpeed: number;
  lensRadius: number;
  dprCap: number;
};

export type LensState = {
  x: number;
  y: number;
  radius: number;
  active: boolean;
  dragging: boolean;
};

export type TopStripProps = {
  brand: string;
  routeLabel: string;
  utilityCounters: UtilityCounter[];
};

export type FooterMetaProps = {
  authorMeta: string;
  authorDescription: string;
  socialLinks: SocialLink[];
  year: string;
  indexLabel: string;
  statusLine: string;
  debugLabel: string;
};

export type AsciiDisplacementCanvasProps = {
  config: AsciiEngineConfig;
  title: string;
  subtitle: string;
};
