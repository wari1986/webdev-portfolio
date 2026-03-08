# AGENTS - `src/app/api/`

Scope: Next.js App Router route handlers and utilities used by those handlers.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), [`../context.md`](../context.md), and the active task brief when one exists.
3. Apply this file for route-handler-specific rules.

## Contracts And Validation

- Validate request input before using it.
- Keep request and response shapes aligned with shared types in `src/types/**` where applicable.
- Avoid `any`; prefer explicit parsing and narrow types.

## Security And Reliability

- Never log secrets or expose internal configuration in responses.
- Return consistent HTTP status codes and keep error payloads intentional.
- Keep server-only logic on the server side; do not leak it into client modules.

## Integration Rules

- Route handlers should delegate reusable logic to `src/lib/**` helpers rather than growing into large orchestration files.
- When a route is part of a client data flow, keep it compatible with Axios and TanStack Query usage on the client.
- If request throttling, guardrails, or feature flags exist for a route, extend those patterns instead of bypassing them.

## References

- Global behavior and workflow rules: [`../AGENTS.md`](../AGENTS.md)
- Shared logic guidance: [`./lib.md`](./lib.md)
- Session runbook: [`../runbooks/codex-session-runbook.md`](../runbooks/codex-session-runbook.md)
