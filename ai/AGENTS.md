# Codex Project Agent Guide

This folder is the local AI operating manual for `webdev-portfolio`.

## Scope

These instructions apply to the entire repository.

## Boot Sequence

Read these files in order at the start of a session:

1. [`ai/AGENTS.md`](./AGENTS.md)
2. [`ai/ARCHITECTURE.md`](./ARCHITECTURE.md)
3. [`ai/DECISIONS.md`](./DECISIONS.md)
4. [`ai/context.md`](./context.md)
5. [`ai/tasks/README.md`](./tasks/README.md)
6. Read the active task brief in `ai/tasks/*.md` when the work has a named feature brief.
7. Load the matching scoped guide when touching a covered area.

## Scoped Guides

- If working in `src/components/**`, read [`ai/agents/components.md`](./agents/components.md).
- If working in `src/lib/**`, `src/config/**`, or `src/types/**`, read [`ai/agents/lib.md`](./agents/lib.md).
- If working in `src/app/api/**`, read [`ai/agents/app-api.md`](./agents/app-api.md).

## Workflow Rules

- Use `pnpm` for install, dev, lint, test, and build commands.
- Keep diffs focused; do not rewrite unrelated code.
- Prefer `apply_patch` for targeted edits.
- Use `rg` and `rg --files` for search.
- Preserve the current stack choices where they already exist: Next.js App Router, TypeScript strict mode, TanStack Query, Axios, React Hook Form, and Zod.
- Remove references to external repositories from code and docs unless the user explicitly asks to document one.

## Engineering Expectations

- Clarity over cleverness.
- Prefer local, composable modules over broad abstractions.
- Fix root causes instead of patching symptoms.
- Use `type` over `interface` unless library constraints make `interface` clearly better.
- Avoid `any`, silent casts, and duplicated domain types.
- Comments should explain intent, constraints, or tradeoffs, not restate code.

## Quality Bar

- Validate behavior with the smallest meaningful command set before finishing.
- Prefer `pnpm lint`, `pnpm test:unit`, and `pnpm build` as the default checks, depending on the area touched.
- When changing user-facing behavior, note the expected manual smoke path.

## Canonical References

- Architecture map: [`ai/ARCHITECTURE.md`](./ARCHITECTURE.md)
- Decision log: [`ai/DECISIONS.md`](./DECISIONS.md)
- Repo context: [`ai/context.md`](./context.md)
- Task brief system: [`ai/tasks/README.md`](./tasks/README.md)
- Session runbook: [`ai/runbooks/codex-session-runbook.md`](./runbooks/codex-session-runbook.md)
