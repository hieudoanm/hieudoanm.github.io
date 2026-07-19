# Cursor: Starter Template

A reusable starting point derived from the **2. Rules Files** section of [Cursor](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```md
<!-- .cursor/rules/project.mdc -->
---
description: Project conventions for agents working in this repo
globs: **/*
---

# Commands
- Install: `pnpm install`
- Type check: `pnpm typecheck` (must pass before commit)
- Test: `pnpm test`
- Format: `pnpm format`

# Structure
- `src/components/atoms/` — single-purpose, no app imports
- `src/components/templates/` — page-level composition
- `src/games/<name>/` — `index.tsx` for UI, `utils.ts` for pure logic, zero UI imports in utils

# Rules
- No secrets in source; read from env through the existing config module
- Never widen a TypeScript type to silence an error; fix the type
- Files ≤ 200 lines, functions ≤ 30 lines
- No new runtime dependency without an ADR
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
