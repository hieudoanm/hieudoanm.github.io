# Bash Best Practices: Decision Record

Use this record when applying [Bash Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing Bash/Shell scripts — the conventions for shell automation, CI scripting, and CLI tooling on POSIX systems. Use when writing, structuring, or reviewing Bash — covers script safety, quoting, conditionals, functions, data handling, error cleanup, and linting.

Bash is the language of the dev script: small, powerful, and quiet until it bites. Practical Bash leans on **a strict error contract (set -euo pipefail), defensive quoting on every expansion, and cleanup guaranteed via trap**. The shell doesn't warn, so the discipline is written into the first three lines of the file and enforced with shellcheck in CI, not by memory.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Bash and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Script Safety Contract
- [ ] 2. Quoting & Expansion
- [ ] 3. Conditionals & Tests
- [ ] 4. Functions & Scope
- [ ] 5. Files, Streams & Data
- [ ] 6. Error Handling & Cleanup
- [ ] 7. Portability
- [ ] 8. Tooling & CI

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
