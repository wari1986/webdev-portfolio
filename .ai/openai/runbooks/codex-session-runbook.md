# Codex Session Runbook

Operational guidance for this repo.

## Pre-Flight Checklist

- Use `pnpm` commands only.
- Confirm which subsystem you are changing: content, canvas, UI composition, or agent route.
- Start with the smallest fix that solves the real problem.

## Troubleshooting Workflow

1. Reproduce the issue with minimal scope.
2. Determine whether the problem is content/config, rendering, interaction state, or server logic.
3. Verify App Router server/client boundaries before restructuring code.
4. Use browser verification for interactive or layout-sensitive behavior when practical.
5. Prefer root-cause fixes over patches.

## Validation and Readiness

- Default baseline: `pnpm lint`
- Logic changes: `pnpm test:unit`
- Visual or interaction changes: `pnpm test:e2e` when relevant
- Production readiness: `pnpm build`
- Include concise manual smoke steps when the change is highly visual.

## Safety Notes

- Do not leak secrets or provider-specific internals to the client.
- Keep agent guardrails, validation, and request limits intact unless the change is intentionally modifying them.
