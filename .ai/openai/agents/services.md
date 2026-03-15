# AGENTS — `src/lib/` and `src/config/`

Scope: non-visual logic, content/config modules, agent provider logic, canvas engine, and HTTP/query helpers.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), [`../context.md`](../context.md), and the active task brief when one exists.
3. Apply this file for logic-layer rules.

## Core Rules

- Keep modules narrow and explicit about their job.
- Keep content modules declarative and typed.
- Keep provider and prompt logic isolated from route handlers and client components.
- Keep canvas math and rendering helpers isolated from page layout code.

## TypeScript and API Rules

- Use `type` aliases and avoid `any`.
- Reuse existing shared types from `src/types/**`.
- Cast only when unavoidable and make the reason obvious.
- Keep server-only configuration and secrets out of client-facing modules.

## Query and HTTP Rules

- Use the existing React Query setup when adding remote client-side data flows.
- Avoid ad-hoc fetch logic when a helper module is warranted.
- Keep request/response mapping in one place rather than scattering it across components.

## References

- Global guidance: [`../AGENTS.md`](../AGENTS.md)
- Runbook: [`../runbooks/codex-session-runbook.md`](../runbooks/codex-session-runbook.md)
