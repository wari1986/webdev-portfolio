# AGENTS — repo structure and module boundaries

Scope: cross-cutting structural changes that touch multiple top-level areas of `src/`.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), [`../context.md`](../context.md), and the active task brief when one exists.
3. Apply this file when the change affects module boundaries instead of a single feature area.

## Structure Rules

- Prefer local changes inside the existing module layout before introducing new folders.
- Keep content, animation, agent logic, and UI composition as separate concerns.
- Avoid creating broad shared utilities when a narrowly scoped helper is enough.
- New top-level structure should reflect an actual durable concern, not one feature branch.

## Type and Boundary Rules

- Reuse `src/types/**` before creating new shared types.
- Keep server-only logic out of client bundles.
- Keep public content separate from private runtime configuration.

## References

- Global guidance: [`../AGENTS.md`](../AGENTS.md)
- Architecture: [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
