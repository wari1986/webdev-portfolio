# Portfolio Decision Log

This file is the canonical decision record for `webdev-portfolio`.

## 2026-03-14 — AI documentation was adapted from another repo into portfolio-specific guidance

### Decision
Keep the imported AI overlay structure, but rewrite its content to match this portfolio repo instead of the trading platform it originally came from.

### Context
The imported docs contained sound engineering philosophy and coding-style guidance, but the architectural assumptions were wrong for this codebase.

### Consequences
- `.ai/openai/*`, `.ai/claude/*`, `AGENTS.md`, and `CLAUDE.md` now describe the actual portfolio architecture.
- Repo-specific philosophy was preserved while stale cross-repo instructions were removed.

## 2026-03-14 — `.ai/` is the shared AI control plane

### Decision
Use `.ai/openai/` for Codex/OpenAI guidance and `.ai/claude/` for Claude guidance.

### Context
The repo needs one discoverable place for long-lived AI context instead of scattering it across root files only.

### Consequences
- Root `AGENTS.md` acts as a small bootstrap file.
- Root `CLAUDE.md` stays focused on behavior and operating rules for Claude sessions.

## Existing convention — App Router portfolio with content-driven homepage composition

### Decision
Keep the homepage composed from a small number of focused modules backed by centralized content definitions.

### Context
The landing page mixes motion, copy, metadata, and progressive enhancements. Centralizing content reduces drift and keeps visual modules focused on rendering behavior.

### Consequences
- `src/lib/content/siteContent.ts` remains the main content source.
- Visual modules should read content through typed props rather than inline duplicated strings.

## Existing convention — Interactive hero uses a dedicated ASCII canvas engine

### Decision
Keep the ASCII displacement effect isolated from page composition and content logic.

### Context
The interaction model is non-trivial and easy to destabilize if it is spread across unrelated UI modules.

### Consequences
- Canvas math stays in `src/lib/canvas/**`.
- UI composition should treat the canvas as a bounded module with clear props.

## Existing convention — Portfolio agent is server-mediated and guardrail-driven

### Decision
Route agent requests through the App Router API layer, with validation, rate limiting, topic guardrails, and provider access on the server.

### Context
The agent uses OpenAI credentials and should answer only within portfolio scope.

### Consequences
- Secrets stay server-side.
- Guardrails and response shaping remain explicit and testable.
- Client UI stays simple and does not own provider logic.

## Existing convention — TypeScript strictness and minimal diff policy

### Decision
Prefer `type`, avoid `any`, reuse existing types, and keep changes focused.

### Context
This repo is small enough that unnecessary abstraction and broad rewrites would create churn faster than value.

### Consequences
- Most changes should be local and easy to reason about.
- New abstractions should be added only when repetition is real.

## Existing convention — `pnpm` is the project package manager

### Decision
Use `pnpm` for scripts and dependency workflows.

### Context
The repo already documents and uses `pnpm`.

### Consequences
- Validation should use `pnpm lint`, `pnpm test:unit`, `pnpm test:e2e`, and `pnpm build`.
