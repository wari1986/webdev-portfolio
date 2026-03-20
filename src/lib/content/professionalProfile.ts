export const siteUrl = "https://www.nicolaycamacho.com";

export const professionalProfile = {
  name: "Nicolay Camacho",
  headline: "Software Engineer · Full-stack systems, automation & AI tooling.",
  description:
    "Software engineer based in Ghent, building web systems and AI-powered tools with a focus on reliable product delivery and practical automation.",
  location: "Ghent, Belgium",
  email: "nicolaycamacho@gmail.com",
  sameAs: [
    "https://github.com/wari1986",
    "https://www.linkedin.com/in/nicolay-camacho-351bb391/",
  ],
} as const;

export const projectAreas = [
  {
    slug: "trading-interfaces",
    name: "Real-time Trading Interfaces",
    description:
      "Frontend and backend systems for responsive, data-heavy trading workflows.",
    status: "active",
    category: ["Full-stack", "Realtime systems"],
  },
  {
    slug: "automation-services",
    name: "Backend Automation Services",
    description:
      "Services that remove repetitive operational work and improve delivery consistency.",
    status: "active",
    category: ["Backend", "Automation"],
  },
  {
    slug: "internal-ai-tooling",
    name: "Internal AI-powered Tools",
    description:
      "Applied AI tooling for internal knowledge workflows and engineering productivity.",
    status: "active",
    category: ["AI tooling", "Internal systems"],
  },
] as const;
