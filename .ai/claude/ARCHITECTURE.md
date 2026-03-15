# Portfolio Architecture

This file is the canonical architecture map for `webdev-portfolio`.
Behavior rules stay in `CLAUDE.md`. Historical rationale stays in `.ai/claude/DECISIONS.md`.

## System Overview

- Runtime: Next.js 16 App Router application.
- Primary goal: deliver a high-fidelity personal portfolio with a canvas-led hero, content-driven profile metadata, and an optional AI agent that can answer questions about Nicolay and his work.
- Tooling baseline: `pnpm`, ESLint, Vitest, Playwright.

## Top-Level Module Map

- [`src/app/`](../../src/app) — root layout, homepage composition, providers, global styles, and `api/agent` route handler.
- [`src/components/`](../../src/components) — UI modules grouped by concern:
  - `agent/` for launcher, dialog, composer, message list, and chat hook
  - `canvas/` for the interactive ASCII displacement surface
  - `hero/`, `layout/`, and `ui/` for composition and shared primitives
- [`src/lib/`](../../src/lib) — non-visual logic:
  - `agent/` for prompt/context/provider/validation logic
  - `canvas/` for the ASCII engine
  - `content/` for the portfolio content model
  - `http/` and `query-client.ts` for API/query plumbing
- [`src/config/`](../../src/config) — feature flags and agent runtime configuration.
- [`src/types/`](../../src/types) — shared types for site and agent domains.
- [`tests/`](../../tests) — unit and end-to-end behavior coverage.

## Data and Control Flow

1. `src/app/page.tsx` composes the landing experience from content plus feature configuration.
2. `src/lib/content/siteContent.ts` is the primary source for the public portfolio copy shown in the hero and footer.
3. `src/components/canvas/AsciiDisplacementCanvas.tsx` renders the interactive field using `src/lib/canvas/asciiEngine.ts`.
4. When the agent feature flag is enabled, `src/components/agent/**` manages the chat UI and sends requests to `src/app/api/agent/route.ts`.
5. The route validates input, enforces guardrails and rate limits, builds the system prompt from portfolio content, and calls the OpenAI provider through `src/lib/agent/**`.

## Architectural Conventions

- Keep portfolio copy and profile metadata centralized instead of duplicating strings across components.
- Keep animation and interaction math isolated from layout composition.
- Preserve the server/client boundary: route handlers own secrets and provider calls; client components consume safe responses only.
- Use React Query when adding remote client-side fetches or mutations rather than ad-hoc state machines.
- Favor a small number of clear modules over broad utility dumping.

## Architecture-Relevant Commands

- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Unit tests: `pnpm test:unit`
- E2E tests: `pnpm test:e2e`
- Production build: `pnpm build`

## Related Documents

- Workflow and guardrails: `CLAUDE.md`
- Operational context: `.ai/claude/context.md`
- Decision history: `.ai/claude/DECISIONS.md`
- Task briefs: `.ai/claude/tasks/README.md`
- Session runbook: `.ai/claude/runbooks/session-runbook.md`
