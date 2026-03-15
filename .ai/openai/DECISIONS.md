# Portfolio Decision Log

This file is the canonical decision record for `webdev-portfolio`.

## 2026-03-14 — Imported AI docs were rewritten for the portfolio repo

### Decision
Preserve the imported engineering philosophy and coding-style rules, but replace all trading-platform-specific architecture guidance with portfolio-specific guidance.

### Context
The copied docs were useful structurally, but their assumptions about repo layout, data flow, and tooling were wrong for this project.

### Consequences
- The AI docs now match the actual Next.js portfolio architecture.
- Stale references to other repos, services, stores, and domain concepts were removed.

## 2026-03-14 — `.ai/` is the shared AI documentation home

### Decision
Use `.ai/openai/` for Codex guidance and `.ai/claude/` for Claude guidance.

### Context
The repo needs a single stable documentation layout for future AI sessions.

### Consequences
- Root `AGENTS.md` stays minimal.
- Canonical AI context now lives under `.ai/`.

## Existing convention — Homepage content is centralized

### Decision
Keep public-facing portfolio copy and metadata in `src/lib/content/siteContent.ts`.

### Context
The homepage and agent prompt both rely on the same core portfolio identity and should not drift.

### Consequences
- Content changes can be made in one place.
- UI modules stay focused on rendering, not copy ownership.

## Existing convention — The canvas hero is a bounded subsystem

### Decision
Keep the ASCII hero effect isolated behind a dedicated engine and component pair.

### Context
The interaction model is specialized and should not bleed into unrelated layout code.

### Consequences
- Canvas behavior remains easier to test and evolve.
- Page composition can stay simple.

## Existing convention — The AI agent is server-mediated with explicit safety controls

### Decision
Use the App Router API route as the boundary for validation, guardrails, rate limiting, and provider access.

### Context
The agent uses OpenAI credentials and should remain scoped to portfolio-related questions.

### Consequences
- Client code stays provider-agnostic.
- Safety controls remain explicit and unit-testable.

## Existing convention — `pnpm` is the package manager

### Decision
Use `pnpm` for scripts and dependency workflows.

### Context
The repo already documents and uses `pnpm`.

### Consequences
- Validation should use `pnpm` commands consistently.
