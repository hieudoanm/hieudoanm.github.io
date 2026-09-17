---
name: "bash-best-practices"
description: "Best practices for writing Bash/Shell scripts — the conventions for shell automation, CI scripting, and CLI tooling on POSIX systems. Use when writing, structuring, or reviewing Bash — covers script safety, quoting, conditionals, functions, data handling, error cleanup, and linting."
tags:
  - "programming"
  - "language"
  - "bash"
when_to_use: "Use when writing, structuring, or reviewing Bash."
prerequisites:
  - "Basic familiarity with Bash and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../power-shell/SKILL.md"
  - "../matlab/SKILL.md"
  - "../csharp/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Bash Best Practices

Bash is the language of the dev script: small, powerful, and quiet until it bites. Practical Bash leans on **a strict error contract (set -euo pipefail), defensive quoting on every expansion, and cleanup guaranteed via trap**. The shell doesn't warn, so the discipline is written into the first three lines of the file and enforced with shellcheck in CI, not by memory.

## When to use

Use when writing, structuring, or reviewing Bash.

## Prerequisites

- Basic familiarity with Bash and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **The first three lines are the safety contract** — set -euo pipefail is non-negotiable
- **Quote everything that expands** — unquoted expansions are the classic injection/typo bug
- **Cleanup lives in trap** — one guaranteed exit path, never scattered returns
- **Functions are the only scope boundary** — local everything, pass everything
- **printf over echo, mapfile/read -r over cat loops, globs over ls parsing.**
- **shellcheck + bash -n are part of "done"** — the shell doesn't warn, the linter does
- [ ] set -euo pipefail first; #!/usr/bin/env bash shebang
- [ ] All expansions double-quoted; ${var:-default} and ${var:?} used consciously

## Focus areas

- 1. Script Safety Contract
- 2. Quoting & Expansion
- 3. Conditionals & Tests
- 4. Functions & Scope
- 5. Files, Streams & Data
- 6. Error Handling & Cleanup
- 7. Portability
- 8. Tooling & CI
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
