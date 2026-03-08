import { siteContent } from "@/lib/content/siteContent";

const agentContext = {
  bio: {
    name: "Nicolay Camacho",
    location: "Ghent, Belgium",
    summary: siteContent.authorDescription,
    intro: "Software engineer focused on practical systems, product delivery, and applied AI.",
  },
  skills: [
    "Full-stack web engineering",
    "TypeScript and React/Next.js",
    "Backend automation services",
    "AI-powered internal tools and workflows",
    "Real-time interfaces and integration-heavy products",
  ],
  projects: [
    {
      name: "Portfolio Interactive Canvas",
      type: "personal product",
      description: "Interactive ASCII displacement hero with custom motion and cursor behavior.",
      highlights: ["Creative frontend systems", "Performance-focused animation", "Tailwind-based UI"],
    },
  ],
  products: [
    {
      name: "Real-time trading interfaces",
      description: "Building responsive interfaces optimized for fast data updates and operator workflows.",
    },
    {
      name: "Automation services",
      description: "Backend automation services that reduce manual operations for teams.",
    },
    {
      name: "Internal AI-powered tools",
      description: "AI copilots and assistants tailored to product and engineering teams.",
    },
  ],
  current_focus: siteContent.statusLine,
} as const;

const listToBullets = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");

const buildAgentContextBlock = () => {
  const projectLines = agentContext.projects
    .map((project) => {
      const highlights = project.highlights.map((highlight) => `    - ${highlight}`).join("\n");
      return `- ${project.name} (${project.type})\n  ${project.description}\n  Highlights:\n${highlights}`;
    })
    .join("\n");

  const productLines = agentContext.products.map((product) => `- ${product.name}: ${product.description}`).join("\n");

  return [
    "[BIO]",
    `Name: ${agentContext.bio.name}`,
    `Location: ${agentContext.bio.location}`,
    `Summary: ${agentContext.bio.summary}`,
    `Intro: ${agentContext.bio.intro}`,
    "",
    "[SKILLS]",
    listToBullets(agentContext.skills),
    "",
    "[PROJECTS]",
    projectLines,
    "",
    "[PRODUCTS]",
    productLines,
    "",
    "[CURRENT_FOCUS]",
    agentContext.current_focus,
  ].join("\n");
};

export default buildAgentContextBlock;
