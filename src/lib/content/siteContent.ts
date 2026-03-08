import { AsciiEngineConfig, SiteContent } from "@/types/site";

export const siteContent: SiteContent = {
  title: "Nicolay Camacho",
  subtitle: "Software Engineer · Full-stack systems, automation & AI tooling.",
  authorMeta: "Ghent, Belgium",
  authorDescription:
    "Software engineer based in Ghent, building web systems and AI powered tools.",
  statusLine:
    "Currently building real-time trading interfaces, backend automation services, and internal AI-powered tools.",
  ctaLabel: "Get in touch →",
  ctaHref: "mailto:nicolaycamacho@gmail.com",
  socialLinks: [
    { id: "email", label: "Email", href: "mailto:nicolaycamacho@gmail.com", external: true },
    { id: "github", label: "GitHub", href: "https://github.com/wari1986", external: true },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/nicolay-camacho-351bb391/", external: true },
  ],
  year: `© ${new Date().getFullYear()}`,
};

export const asciiEngineConfig: AsciiEngineConfig = {
  cellSize: 12,
  charset: " .'`^,:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  noiseScale: 14.2,
  animationSpeed: 0.0002,
  lensRadius: 16,
  dprCap: 2,
};
