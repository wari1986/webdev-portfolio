# AGENTS — `src/components/`

Scope: portfolio UI modules, including canvas, agent UI, hero, layout, and shared primitives.

## Boot Sequence

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read [`../ARCHITECTURE.md`](../ARCHITECTURE.md), [`../DECISIONS.md`](../DECISIONS.md), [`../context.md`](../context.md), and the active task brief when one exists.
3. Apply this file for component-specific rules.

## Core Rules

- Use React functional components and keep modules cohesive.
- Default to server components; add `"use client"` only when interaction or browser APIs require it.
- Keep page composition thin and push specialized logic into focused child modules or helpers.
- When multiple props make the signature noisy, accept `props` and destructure inside the component body.
- Comments should explain constraints or intent, not narrate JSX.

## Visual and UX Rules

- Preserve the portfolio's deliberate visual tone; avoid generic dashboard or component-library styling.
- Extend the current primitives before adding new ones.
- Verify keyboard and screen-reader basics for interactive controls.
- For animation-heavy changes, check both desktop and mobile behavior.

## Data and State

- Do not call provider APIs directly from components.
- For agent UI, keep server communication behind the existing chat hook and route boundary.
- For future remote client data, use React Query instead of ad-hoc `useEffect` fetching.

## References

- Global guidance: [`../AGENTS.md`](../AGENTS.md)
- Runbook: [`../runbooks/codex-session-runbook.md`](../runbooks/codex-session-runbook.md)
