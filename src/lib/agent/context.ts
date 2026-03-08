import { siteContent } from "@/lib/content/siteContent";

const agentContext = {
  bio: {
    name: "Nicolay Camacho",
    location: "Ghent, Belgium",
    summary: siteContent.authorDescription,
    intro: "Software engineer focused on practical systems, product delivery, and applied AI.",
  },
  skills: [
    "Full-stack web engineering (TypeScript, React, Next.js)",
    "Backend services in Node.js — REST APIs, queue workers, scheduled jobs",
    "AI-powered internal tools: prompt design, RAG pipelines, LLM integration",
    "Real-time interfaces: WebSocket/SSE, live data feeds, operator dashboards",
    "Automation pipelines that replace manual workflows for product and ops teams",
    "Integration-heavy systems (third-party APIs, webhooks, data sync)",
    "Testing and observability — unit tests, E2E (Playwright), structured logging",
  ],
  projects: [
    {
      name: "Portfolio Interactive Canvas",
      type: "personal / open experiment",
      description:
        "ASCII displacement hero canvas built from scratch — custom noise engine, cursor-driven lens distortion, and real-time character rendering with no external animation library.",
      highlights: [
        "Simplex-noise based per-cell animation loop running at 60fps",
        "Custom lens distortion effect driven by mouse/touch position",
        "Tailwind-based UI on top of a raw canvas rendering layer",
        "Dark/light theme with CSS custom properties and no flash on load",
      ],
    },
    {
      name: "Real-time trading dashboards",
      type: "professional product",
      description:
        "Operator-facing dashboards for financial trading workflows — low-latency UI updated over WebSocket, complex filtering, and high information density without sacrificing usability.",
      highlights: [
        "Sub-second UI updates on live market data",
        "Custom table virtualization for thousands of rows",
        "Role-based access control with per-view permission guards",
        "Comprehensive E2E test coverage for critical operator flows",
      ],
    },
    {
      name: "Backend automation services",
      type: "professional product",
      description:
        "Event-driven backend services that automate recurring manual operations — ingesting data from external sources, transforming it, and triggering downstream actions without human intervention.",
      highlights: [
        "Queue-based architecture for reliable async processing",
        "Retry logic, dead-letter queues, and structured error logging",
        "Webhook integrations with third-party platforms",
        "Significantly reduced team manual workload on core ops tasks",
      ],
    },
    {
      name: "Internal AI-powered copilots",
      type: "professional product",
      description:
        "LLM-backed assistants and copilot tools built for internal product and engineering teams — bridging unstructured knowledge and structured workflows.",
      highlights: [
        "Prompt engineering and system prompt design for constrained use cases",
        "RAG pipelines over internal documentation and knowledge bases",
        "Context-aware suggestions integrated into existing team workflows",
        "Safety guardrails and output validation to keep responses on-topic",
      ],
    },
  ],
  experience: {
    summary:
      "Several years of professional experience building production systems across fintech and B2B SaaS. Comfortable owning features end-to-end — from API design to frontend implementation and deployment.",
    approach:
      "Prefers shipping practical systems over over-engineering. Focuses on correctness, maintainability, and low operational overhead. Treats testing and observability as part of building, not afterthoughts.",
  },
  current_focus: siteContent.statusLine,
} as const;

const listToBullets = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");

const buildAgentContextBlock = () => {
  const projectLines = agentContext.projects
    .map((project) => {
      const highlights = project.highlights.map((h) => `    - ${h}`).join("\n");
      return `- ${project.name} (${project.type})\n  ${project.description}\n  Highlights:\n${highlights}`;
    })
    .join("\n");

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
    "[PROJECTS & WORK]",
    projectLines,
    "",
    "[EXPERIENCE]",
    `Summary: ${agentContext.experience.summary}`,
    `Approach: ${agentContext.experience.approach}`,
    "",
    "[CURRENT_FOCUS]",
    agentContext.current_focus,
  ].join("\n");
};

export default buildAgentContextBlock;
