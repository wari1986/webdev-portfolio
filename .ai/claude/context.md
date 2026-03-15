# Repository Operational Context

## Current Focus

- `.ai/` is the local AI control plane for this repo.
- The app is a portfolio experience, not a product dashboard or CRUD frontend.
- Preserve the current balance between strong visual identity and restrained structure.
- Keep content, animation, and agent concerns in their existing boundaries.

## Known Fragile Areas

- The ASCII canvas interaction can regress easily on hover, drag, resize, and mobile behavior.
- App Router server/client boundaries matter around the agent route and interactive UI modules.
- Agent behavior depends on prompt/context, validation, guardrails, and rate limiting all staying aligned.
- Small content changes can unintentionally break layout rhythm or visual balance if made without checking the actual page.

## Architectural Constraints

- `src/app/page.tsx` should stay mostly compositional.
- Portfolio copy should remain centralized in `src/lib/content/siteContent.ts`.
- OpenAI access and secrets must remain server-side in `src/app/api/agent/**` and `src/lib/agent/provider.ts`.
- Interactive client concerns belong in client components and local hooks; avoid leaking them into the route layer.

## Common Mistakes

- Duplicating site copy in UI components instead of reading from the shared content module.
- Mixing provider logic into the client instead of the API route/server helper layer.
- Breaking mobile/desktop interaction parity in the canvas or cursor behavior.
- Adding generic UI abstractions that dilute the current design language.
- Using broad utilities when a small local helper would be clearer.

## Active Direction

- The portfolio is evolving toward richer projects, improved mobile behavior, and a more polished AI assistant experience.
- The AI docs are now aligned with the real codebase and should stay specific to this repo.

## Notes for Future Sessions

- Start from `.ai/claude/ARCHITECTURE.md` when scoping work.
- If a task spans sessions, create a focused brief in `.ai/claude/tasks/`.
- For UI changes, verify both desktop and mobile behavior.
- For agent changes, validate guardrails, fallback behavior, and request limits in addition to the happy path.
