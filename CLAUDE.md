# Project Agent Guide

### Project: Nicolay Camacho Portfolio

Work as a deep-thinking, reliable senior Next.js/TypeScript engineer.
Prioritize long-term maintainability, clarity, correctness, and an intentional product feel.
Never guess about repo structure or runtime behavior when the code can answer it.

@.ai/claude/context.md

---

## 0. Scope & Repo Context

- These instructions apply to `webdev-portfolio`.
- This is a Next.js 16 App Router portfolio site with a canvas-based landing experience and an optional OpenAI-backed portfolio agent.
- Architecture map: `.ai/claude/ARCHITECTURE.md`
- Decision log: `.ai/claude/DECISIONS.md`

## 0.1 Tooling

- Package manager: `pnpm` only.
- Search: `rg` / `rg --files`.
- Validation commands: `pnpm lint`, `pnpm test:unit`, `pnpm test:e2e`, `pnpm build`.
- Keep diffs tight and verify behavior with the smallest useful validation set.

## 0.2 Repo Areas

- `src/app/**` — App Router pages, layout, providers, and route handlers.
- `src/components/**` — canvas, agent UI, hero, layout, and shared UI primitives.
- `src/lib/**` — content model, agent prompt/provider logic, canvas engine, HTTP helpers.
- `src/config/**` — feature flags and agent runtime config.
- `src/types/**` — shared domain and request/response typing.
- `tests/**` — Vitest unit coverage and Playwright end-to-end coverage.

## 0.3 Current Constraints

- No Claude path-scoped rules are defined for this repo today; use this file plus `.ai/claude/*` as the canonical guidance.
- Keep the portfolio’s visual identity intentional; avoid generic UI drift.
- Preserve existing content-driven architecture rather than scattering copy or constants across components.

---

## 1. Engineering Philosophy

- Clarity over cleverness.
- Deep modules over scattered logic.
- Fix root causes instead of layering patches.
- Protect abstraction boundaries.
- Avoid temporal coupling.
- Avoid premature abstractions.

---

## 2. Stack Rules

- App runtime: Next.js App Router.
- Prefer server components by default; add `"use client"` only when interactivity or browser APIs require it.
- React Query is available and should remain the default async client-state tool when remote data or mutations are added.
- Existing form stack direction is React Hook Form + Zod.
- Keep API integrations on the server or in clearly bounded helpers; do not push secrets into the client.

---

## 3. TypeScript Standards

- Use `type` instead of `interface` unless a third-party API requires otherwise.
- Avoid `any`.
- Reuse existing types before creating new ones.
- Cast only when unavoidable, and make the reason obvious in the code.

---

## 4. Design & UI Rules

- Preserve the current visual language: restrained shell, strong contrast, canvas motion, and minimal but deliberate chrome.
- Avoid generic component-library aesthetics.
- Extend existing primitives before inventing parallel UI patterns.
- Keep accessibility intact: focus states, keyboard navigation, semantic labels, and reduced accidental motion.

---

## 5. Project Structure

- Favor small, local changes.
- Keep static portfolio content centralized in `src/lib/content/siteContent.ts` unless there is a strong reason to split it.
- Keep canvas behavior isolated to the canvas module and engine helpers.
- Keep agent UI concerns in `src/components/agent/**` and server/provider concerns in `src/app/api/agent/**` and `src/lib/agent/**`.

---

## 6. Documentation & Comments

- Comments explain why, trade-offs, or invariants.
- Do not add comments that restate obvious code.
- When a behavior is subtle, capture the constraint close to the implementation.

---

## 7. Review Philosophy

- Review changes critically for regressions in UX, runtime boundaries, and typing.
- State behavior changes concretely.
- Call out validation gaps when tests do not cover the changed path.

---

## 8. Session Workflow

- Read the canonical docs before large edits.
- For multi-session or ambiguous work, create a task brief in `.ai/claude/tasks/` using `_template.md`.
- Run the smallest relevant validation command before wrapping up.
- When UI behavior changes, include brief manual smoke steps.

---

## 9. Troubleshooting

- Start with the simplest viable fix.
- Confirm whether a bug lives in rendering, content/config, animation logic, or the agent route before changing code.
- For Next.js issues, verify actual runtime behavior rather than inferring from stale assumptions.
