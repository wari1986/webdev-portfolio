# Claude Session Runbook

Operational guidance for working in this repo. Behavior rules stay in `CLAUDE.md`; architecture lives in `.ai/claude/ARCHITECTURE.md`.

## Pre-Flight Checklist

- Use `pnpm` commands only.
- Reproduce the issue or confirm the requested change area before editing.
- Decide whether the work is mainly content, UI composition, animation behavior, or agent/backend logic.

## Troubleshooting Workflow

1. Reproduce the issue with the smallest possible surface.
2. Check whether the problem comes from content/config, rendering, animation state, or the agent route.
3. Verify App Router server/client boundaries before moving logic around.
4. For visual changes, inspect real browser behavior rather than relying on static code assumptions.
5. Prefer root-cause changes over patches.

## Validation and Readiness

- Run the smallest relevant validation command before wrapping up.
- Prefer `pnpm lint` as the default baseline.
- Use `pnpm test:unit` for logic changes and `pnpm test:e2e` for UI/interaction flows when relevant.
- Call out manual smoke steps when behavior is visual or interaction-heavy.

## Safety Notes

- Do not expose secrets or provider internals to the client.
- Keep rate limiting and guardrails intact when changing the agent route.
- Avoid unrelated visual rewrites while touching focused behavior.

## Task Brief Workflow

- For multi-session or uncertain work, create a task brief in `.ai/claude/tasks/` using `_template.md`.
- Keep briefs short, concrete, and decision-oriented.
