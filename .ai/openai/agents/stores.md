# AGENTS — local state guidance

Scope: client-side state patterns in this repo.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), and [`../context.md`](../context.md).
3. Apply this file when adding or changing non-trivial client state.

## Patterns

- Prefer component-local state unless state truly needs to be shared.
- Use focused custom hooks for interaction-heavy behavior.
- Keep derived state derived; do not duplicate it.
- When remote state is involved, prefer React Query over bespoke caching.

## Constraints

- Do not add a global client-state library unless there is a proven need.
- Keep animation state near the component or hook that owns the interaction.
- Keep agent conversation UI state separate from provider/server concerns.

## References

- Global guidance: [`../AGENTS.md`](../AGENTS.md)
- Architecture: [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
