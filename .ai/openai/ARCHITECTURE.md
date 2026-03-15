# Portfolio Architecture

This file is the canonical architecture map for `webdev-portfolio`.
Behavior and workflow rules stay in [`.ai/openai/AGENTS.md`](./AGENTS.md). Historical rationale stays in [`.ai/openai/DECISIONS.md`](./DECISIONS.md).

## System Overview

- Runtime: Next.js 16 App Router.
- Primary goal: ship a portfolio site with a distinctive animated landing experience and an optional AI agent that answers questions about Nicolay's work, skills, and projects.
- Tooling baseline: `pnpm`, ESLint, Vitest, Playwright.

## Top-Level Module Map

- [`src/app/`](../../src/app) — layout, homepage, providers, route handlers, and global styles.
- [`src/components/`](../../src/components) — visual modules and UI primitives:
  - `agent/`
  - `canvas/`
  - `hero/`
  - `layout/`
  - `ui/`
- [`src/lib/`](../../src/lib) — core non-visual logic:
  - `agent/`
  - `canvas/`
  - `content/`
  - `http/`
  - `query-client.ts`
- [`src/config/`](../../src/config) — feature flags and runtime config.
- [`src/types/`](../../src/types) — shared site and agent types.
- [`tests/`](../../tests) — unit and end-to-end test coverage.

## Data and Control Flow

1. `src/app/page.tsx` assembles the homepage from content and feature configuration.
2. `src/lib/content/siteContent.ts` provides the main copy and metadata for the hero and footer.
3. `src/components/canvas/AsciiDisplacementCanvas.tsx` consumes `src/lib/canvas/asciiEngine.ts` to render the animated field.
4. `src/components/agent/**` owns the chat UI and local interaction state.
5. `src/app/api/agent/route.ts` validates requests, enforces limits and guardrails, builds the system prompt, and delegates model calls to `src/lib/agent/provider.ts`.

## Architectural Conventions

- Keep content definitions centralized and typed.
- Keep animation logic isolated from page composition.
- Keep provider access, secrets, and request validation on the server.
- Prefer React Query for remote client-state work instead of ad-hoc effects.
- Favor local helpers over broad utility growth.

## Architecture-Relevant Commands

- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Unit tests: `pnpm test:unit`
- E2E tests: `pnpm test:e2e`
- Build: `pnpm build`

## Related Documents

- Workflow and guardrails: [`.ai/openai/AGENTS.md`](./AGENTS.md)
- Decision history: [`.ai/openai/DECISIONS.md`](./DECISIONS.md)
- Task briefs: [`.ai/openai/tasks/README.md`](./tasks/README.md)
- Runbook: [`.ai/openai/runbooks/codex-session-runbook.md`](./runbooks/codex-session-runbook.md)
