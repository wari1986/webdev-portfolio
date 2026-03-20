import { AsciiEngineConfig, SiteContent } from "@/types/site";
import { professionalProfile } from "@/lib/content/professionalProfile";

export const siteContent: SiteContent = {
  title: professionalProfile.name,
  subtitle: professionalProfile.headline,
  authorMeta: professionalProfile.location,
  authorDescription: professionalProfile.description,
  statusLine:
    "Currently building real-time trading interfaces, backend automation services, and internal AI-powered tools.",
  ctaLabel: "Get in touch →",
  ctaHref: `mailto:${professionalProfile.email}`,
  socialLinks: [
    { id: "email", label: "Email", href: `mailto:${professionalProfile.email}`, external: true },
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
