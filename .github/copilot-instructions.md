# Copilot Instructions for this Repository

## Scope
- Keep changes minimal and targeted.
- Do not add unrelated refactors.
- Do not modify design details unless explicitly requested.

## Technical baseline
- Stack: Astro + React + Tailwind + TypeScript.
- Deployment path depends on `astro.config.mjs` (`site` and `base`).
- Analytics setup is documented in `UMAMI_SETUP.md`.

## Validation workflow
- After code changes always run:
  1. `npm.cmd run check`
  2. `npm.cmd run build`
- If PowerShell policy blocks `npm`, use `npm.cmd`.

## Editing rules
- Prefer changes inside existing components/pages over creating new abstractions.
- Keep class naming and Tailwind style consistent with existing files.
- Avoid introducing new dependencies unless there is strong justification.

## Agent-only workspace policy
- Assume user works in agent mode and does not manually code.
- Prefer automation (`tasks.json`, scripts, reproducible commands).
- Keep extension/tooling recommendations aligned with strict agent-only setup in `.vscode/extensions.json`.

## User preference
- Do not remove the `Material Icon Theme` extension if present.
