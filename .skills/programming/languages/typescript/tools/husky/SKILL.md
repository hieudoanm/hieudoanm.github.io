---
name: "husky-best-practices"
description: "Best practices for Git hooks with Husky — v9 setup, hook script format, lint-staged and commitlint integration, CI parity, and when to use lefthook instead. Use when adding or debugging pre-commit hooks in a JS/TS repo."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "developer-tools"
  - "husky"
when_to_use: "Use when adding or debugging pre-commit hooks in a JS/TS repo."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../prettier/SKILL.md"
  - "../eslint/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Husky

Husky puts a core.hooksPath entry in your repo so that Git runs scripts in .husky/ instead of .git/hooks/. That single indirection is the whole point: **hooks become committed, reviewable, and identical on every machine** — no more "my pre-commit hook worked but yours didn't". Practical Husky work is mostly about **getting the v9 setup right, keeping hooks fast, and putting the real work in tooling that Husky only triggers**.

_Verified against Husky 9.1.7, lint-staged 17.6.0, commitlint 21.2.3. Alternatives checked: lefthook 2.1.14, simple-git-hooks 2.14.0._

## When to use

Use when adding or debugging pre-commit hooks in a JS/TS repo.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Pre-v9 boilerplate left in .husky/** (_/husky.sh), which either errors or silently does nothing on v9
- **Missing "prepare": "husky"**, so hooks work for the developer who set them up and nobody else
- **A whole-repo lint in pre-commit**, which trains the team to use --no-verify
- **Fixing but not aborting** — a hook without set -e reports problems and commits anyway
- **Losing the executable bit**, especially across a Windows checkout or a core.fileMode=false clone
- **Relying on a hook to enforce something CI does not also check**, which makes it a suggestion rather than a control
- **npx commitlint without --no**, allowing a mid-commit network install
- **Assuming hooks run in CI.** They do not; clones in pipelines skip them entirely

## Focus areas

- 1. What Husky Actually Does
- 2. Setup
- 3. Hook Scripts
- 4. lint-staged
- 5. Commit Messages
- 6. Keeping Hooks Fast
- 7. Monorepos
- 8. Platform Notes
- 9. Alternatives
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
