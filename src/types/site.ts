export type SocialLink = {
  id: string;
  label: string;
  href: string;
  external: boolean;
};

export type SiteContent = {
  title: string;
  subtitle: string;
  authorMeta: string;
  authorDescription: string;
  statusLine: string;
  socialLinks: SocialLink[];
  year: string;
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

export type FooterMetaProps = {
  authorMeta: string;
  authorDescription: string;
  socialLinks: SocialLink[];
  year: string;
};

export type AsciiDisplacementCanvasProps = {
  config: AsciiEngineConfig;
  title: string;
  subtitle: string;
};
