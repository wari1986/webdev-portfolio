# Webdev Portfolio Decision Log

This file records durable engineering decisions for `webdev-portfolio`.

## 2026-03-08 - Keep AI repo guidance, but rewrite it against local boundaries

### Decision
Keep the `ai/` operating-doc pattern, but align every document and scoped guide to this repository instead of the source repo it came from.

### Context
The imported docs referenced a trading platform monorepo, external paths, and folders that do not exist here.

### Consequences

- `ai/` remains the local control plane for Codex sessions.
- Only scoped guides for real folders stay in `ai/agents/`.
- Future updates should reference local paths only.

## Existing convention - Next.js App Router is the primary runtime

### Decision
Use Next.js App Router for page composition, layout, and route handlers.

### Context
The current project already lives under `src/app/**` and includes App Router APIs.

### Consequences

- New route handlers belong under `src/app/api/**`.
- Documentation should not reference legacy `pages/api` patterns unless the codebase actually adds them.

## Existing convention - Network access is standardized on Axios and TanStack Query

### Decision
Preserve Axios and TanStack Query as the default client-side data-access stack where request lifecycle state matters.

### Context
The repo already ships with a shared Axios client and a configured Query Client.

### Consequences

- New async data flows should prefer the shared client and TSQ primitives over one-off networking code.
- Existing simple request paths can remain direct when that is intentional and lower-overhead.

## Existing convention - Form work should use React Hook Form and Zod

### Decision
Keep RHF and Zod as the preferred form stack for future form surfaces.

### Context
Both libraries are installed and already called out in the project README and stack notes.

### Consequences

- New forms should not introduce a parallel validation/form library without a concrete reason.
- Validation schemas should stay close to the form or shared type boundary they support.

## Existing convention - TypeScript stays strict and explicit

### Decision
Prefer `type` aliases, avoid `any`, and minimize casts.

### Context
The repo uses strict TypeScript and benefits from preserving that signal.

### Consequences

- Reuse shared types from `src/types/**` and related modules before inventing new shapes.
- Casts should remain rare and justified.

## Existing convention - Minimal diffs over speculative refactors

### Decision
Favor small, scoped changes that preserve the current architecture.

### Context
This repo mixes interactive UI, canvas logic, and agent behavior, so broad refactors carry unnecessary risk.

### Consequences

- Prefer extending existing modules over introducing new top-level abstractions.
- Validation should stay proportional to the surface changed.
