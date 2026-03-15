# AGENTS — `src/app/api/`

Scope: App Router route handlers, especially the portfolio agent endpoint.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), [`../context.md`](../context.md), and the active task brief when one exists.
3. Apply this file for route-handler constraints.

## Input Validation and Contracts

- Validate request payloads explicitly.
- Reuse shared types from `src/types/**` when possible.
- Avoid `any`; keep request and response shapes precise.

## Security and Safety

- Never expose secrets in responses or logs.
- Keep OpenAI access on the server only.
- Preserve guardrails, rate limiting, and fallback behavior unless the task intentionally changes them.

## Integration Rules

- Route handlers should orchestrate validation, policy, and response shaping, not own large business-logic blobs.
- Push provider-specific behavior into `src/lib/agent/**`.
- Keep error responses predictable and avoid leaking internals.

## References

- Global guidance: [`../AGENTS.md`](../AGENTS.md)
- Runbook: [`../runbooks/codex-session-runbook.md`](../runbooks/codex-session-runbook.md)
