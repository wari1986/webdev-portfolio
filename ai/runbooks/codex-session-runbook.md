# Codex Session Runbook

Operational guidance that complements [`ai/AGENTS.md`](../AGENTS.md).

## Pre-Flight Checklist

- Confirm whether the change is UI-only, shared-lib, or route-handler work before editing.
- Use `pnpm` commands for local verification.
- Prefer the smallest change that resolves the issue cleanly.

## Troubleshooting Workflow

1. Reproduce the issue with minimal scope.
2. Verify local assumptions such as env vars, feature flags, and whether the work touches the client, server, or both.
3. For App Router issues, inspect `src/app/**` boundaries before changing shared modules.
4. For agent issues, trace the full request path:
   client UI -> `src/components/agent/**`
   request contract -> `src/types/agent.ts`
   route handler -> `src/app/api/agent/**`
   prompt/provider logic -> `src/lib/agent/**`
5. Prefer root-cause fixes over UI-level patches that hide the real problem.

## Validation

- Run `pnpm lint` by default for code changes.
- Add `pnpm test:unit` when shared logic changes.
- Add `pnpm build` when route structure, config, or type boundaries change.
- If a change is primarily visual or interaction-heavy, record a short manual smoke path.

## Safety Notes

- Do not expose secrets in logs, client bundles, or docs.
- Keep external-repo references out of the local AI docs unless explicitly requested.
