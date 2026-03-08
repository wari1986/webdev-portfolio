# Repository Operational Context

## Current Focus

- Keep `ai/` as the local documentation layer for Codex sessions.
- Preserve the current portfolio experience while the repo grows into richer app and agent features.
- Reuse the installed stack choices that are already present: TSQ, Axios, RHF, and Zod.

## Known Sensitive Areas

- `src/components/canvas/**` and [`src/lib/canvas/asciiEngine.ts`](../src/lib/canvas/asciiEngine.ts) drive the interactive hero and can regress performance or input behavior.
- `src/components/agent/**`, `src/lib/agent/**`, and `src/app/api/agent/**` span a client/server boundary and are easy to break with mismatched request or response shapes.
- `src/lib/http/axios.ts` and `src/lib/query-client.ts` are foundational setup points; changes there have broad blast radius.

## Architectural Constraints

- App Router is the canonical routing model.
- Shared data-fetching primitives should build on Axios and TanStack Query where appropriate.
- Form features should prefer React Hook Form plus Zod.
- Shared types should stay explicit and colocated with the app domain, usually in `src/types/**` or the owning module.

## Common Mistakes

- Reintroducing legacy Pages Router assumptions into an App Router codebase.
- Adding duplicate fetch clients instead of extending the shared Axios setup.
- Skipping TSQ for request state that clearly needs cache or mutation coordination.
- Creating ad-hoc types inside components when the shape is shared elsewhere.
- Mixing UI concerns, transport details, and prompt logic in the same file.

## Notes For Future Sessions

- Start from `ai/AGENTS.md`, then load the relevant scoped guide for the area being changed.
- If the work has a durable brief, keep it in `ai/tasks/*.md`.
- Remove or rewrite imported documentation that still references another repository instead of preserving it as-is.
