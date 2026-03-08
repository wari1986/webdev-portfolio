# AGENTS - `src/components/`

Scope: UI composition, interactive surfaces, agent widgets, hero/canvas UI, and shared presentational primitives.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), [`../context.md`](../context.md), and the active task brief when one exists.
3. Apply this file for component-specific rules.

## Core Rules

- Use React function components.
- Keep components cohesive; move cross-cutting logic into `src/lib/**` or local hooks when it stops being UI logic.
- Prefer existing UI and layout primitives before creating new ones.
- Respect client/server boundaries. Add `"use client"` only when state, effects, refs, or browser APIs require it.

## Data And Async Behavior

- Prefer TanStack Query for client-side async state that benefits from caching, invalidation, retries, or mutation coordination.
- Reuse the shared Axios setup when a component-driven feature needs API access.
- Avoid embedding transport or prompt-construction details directly in UI components.
- Existing direct request flows may stay direct when that is the current design and no TSQ behavior is needed.

## Forms And Inputs

- For new forms, prefer React Hook Form plus Zod.
- Keep form schema and submission logic close to the form surface unless the shape is reused elsewhere.

## Styling And UX

- Preserve the established visual language of the portfolio instead of introducing unrelated patterns.
- Be careful in canvas-adjacent components; animation and pointer behavior should remain intentional and performant.
- Keep accessibility basics intact: focusability, labeling, keyboard interaction, and readable text hierarchy.

## References

- Global behavior and workflow rules: [`../AGENTS.md`](../AGENTS.md)
- Shared logic guidance: [`./lib.md`](./lib.md)
- Session runbook: [`../runbooks/codex-session-runbook.md`](../runbooks/codex-session-runbook.md)
