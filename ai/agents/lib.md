# AGENTS - `src/lib/`, `src/config/`, `src/types/`

Scope: shared application logic, data access helpers, agent orchestration, config, and shared type contracts.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), [`../context.md`](../context.md), and the active task brief when one exists.
3. Apply this file for shared-logic-specific rules.

## Data Access And Querying

- Reuse the shared Axios client in `src/lib/http/axios.ts` instead of creating duplicate clients.
- Use TanStack Query for client-observed async state that needs cache behavior, invalidation, retries, or mutation lifecycle control.
- Keep transport concerns separate from UI concerns.
- If a simple direct request path already exists and TSQ adds no meaningful value, keep the simpler shape.

## Config And Types

- Keep configuration explicit and close to runtime boundaries.
- Reuse and extend shared types before adding duplicate shapes inside consumers.
- Prefer `type` aliases and keep casts rare.

## Agent-Specific Guidance

- Keep prompt construction, provider wiring, validation, and guardrails separated by responsibility.
- Preserve the distinction between client chat UI, API contract types, and provider implementation details.
- When changing agent behavior, trace both the request path and fallback behavior.

## Forms

- For shared form helpers or schemas, prefer React Hook Form compatibility and Zod-based validation.

## References

- Global behavior and workflow rules: [`../AGENTS.md`](../AGENTS.md)
- Route-handler guidance: [`./app-api.md`](./app-api.md)
- Component guidance: [`./components.md`](./components.md)
