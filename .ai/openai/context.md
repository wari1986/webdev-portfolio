# Repository Operational Context

## Current Focus

- Keep the local AI overlay in `.ai/` aligned with the actual repo.
- Preserve the portfolio's distinct visual identity while improving functionality.
- Maintain clean boundaries between content, canvas behavior, and agent logic.

## Known Fragile Areas

- Canvas hover/drag/mobile behavior can regress subtly.
- The agent route depends on validation, rate limiting, guardrails, and provider behavior remaining in sync.
- Server/client boundary mistakes in App Router can cause runtime failures.
- Visual changes can look correct in code review but feel wrong in the browser.

## Architectural Constraints

- `src/app/page.tsx` should remain a composition layer, not a logic dump.
- Public copy should stay centralized in `src/lib/content/siteContent.ts`.
- Secrets and OpenAI provider logic must stay server-side.
- Shared site and agent types should stay in `src/types/**`.

## Common Mistakes

- Duplicating content strings in components.
- Using ad-hoc fetch/effect logic instead of the existing route/helper boundaries.
- Expanding generic UI primitives when the current design only needs a narrow surface.
- Making motion changes without checking mobile and desktop behavior separately.
- Bypassing validation or guardrails when modifying the agent flow.

## Active Direction

- The site is moving toward stronger project presentation, better mobile polish, and a more useful AI assistant.

## Notes for Future Sessions

- Read the boot files first, then the module guide matching the touched area.
- For UI changes, verify desktop and mobile behavior.
- For agent changes, validate both the happy path and refusal/fallback paths.
