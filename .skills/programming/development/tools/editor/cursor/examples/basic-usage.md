# Cursor: Basic Usage

Best practices for working in the Cursor editor — rules files for AI behaviour, reviewing AI diffs as code review, agent mode boundaries, and privacy of repository indexing. Use when configuring, or working with AI-assisted editing in Cursor.

## Scenario

Use this example as a starting point when applying **cursor-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Rules Files** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
