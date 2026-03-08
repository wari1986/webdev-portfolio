# Webdev Portfolio Architecture

This file is the canonical architecture map for `webdev-portfolio`.
Behavior rules live in [`ai/AGENTS.md`](./AGENTS.md). Historical rationale lives in [`ai/DECISIONS.md`](./DECISIONS.md).

## System Overview

- Runtime: Next.js 16 App Router application.
- Primary goal: a high-fidelity portfolio site with an interactive front page and an AI-powered agent entrypoint.
- State and data tooling available in the repo: TanStack Query, Axios, React Hook Form, and Zod.
- Package manager: `pnpm`.

## Top-Level Module Map

- [`src/app/`](../src/app): App Router entrypoints, layout, providers, and route handlers.
- [`src/app/api/`](../src/app/api): server route handlers, currently centered on the portfolio agent API.
- [`src/components/`](../src/components): UI composition, agent UI, canvas rendering, and shared primitives.
- [`src/lib/`](../src/lib): reusable application logic such as HTTP setup, agent orchestration, canvas logic, and content helpers.
- [`src/config/`](../src/config): runtime and feature configuration.
- [`src/types/`](../src/types): shared application and API types.

## Data and Control Flow

1. `src/app/page.tsx` and related App Router files compose the shell and page-level experience.
2. Interactive UI lives under `src/components/**`.
3. Shared logic and external integration helpers live under `src/lib/**`.
4. Network access should prefer the shared Axios client in [`src/lib/http/axios.ts`](../src/lib/http/axios.ts) plus TanStack Query where request state needs caching or synchronization.
5. The existing portfolio agent flow uses `src/app/api/agent/route.ts` on the server and `src/components/agent/useAgentChat.ts` on the client.

## Architectural Conventions

- Prefer App Router patterns over legacy Pages Router conventions.
- Reuse the shared Axios client instead of scattering ad-hoc clients.
- Use TanStack Query for non-trivial async client state, cache coordination, or mutation flows.
- When forms are introduced or expanded, prefer React Hook Form with Zod-based validation.
- Keep domain types centralized in `src/types/**` when shared across modules.
- Avoid creating parallel utility layers when existing `src/lib/**` modules already cover the concern.

## Reference Commands

- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Unit tests: `pnpm test:unit`
- E2E tests: `pnpm test:e2e`
- Build: `pnpm build`

## Related Documents

- Workflow and guardrails: [`ai/AGENTS.md`](./AGENTS.md)
- Decision history: [`ai/DECISIONS.md`](./DECISIONS.md)
- Repo context: [`ai/context.md`](./context.md)
- Session runbook: [`ai/runbooks/codex-session-runbook.md`](./runbooks/codex-session-runbook.md)
