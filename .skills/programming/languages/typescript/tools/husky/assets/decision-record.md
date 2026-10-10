# Husky: Decision Record

Use this record when applying [Husky](../SKILL.md) to a concrete project decision.

## Context

Best practices for Git hooks with Husky — v9 setup, hook script format, lint-staged and commitlint integration, CI parity, and when to use lefthook instead. Use when adding or debugging pre-commit hooks in a JS/TS repo.

Husky puts a core.hooksPath entry in your repo so that Git runs scripts in .husky/ instead of .git/hooks/. That single indirection is the whole point: **hooks become committed, reviewable, and identical on every machine** — no more "my pre-commit hook worked but yours didn't". Practical Husky work is mostly about **getting the v9 setup right, keeping hooks fast, and putting the real work in tooling that Husky only triggers**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. What Husky Actually Does
- [ ] 2. Setup
- [ ] 3. Hook Scripts
- [ ] 4. lint-staged
- [ ] 5. Commit Messages
- [ ] 6. Keeping Hooks Fast
- [ ] 7. Monorepos
- [ ] 8. Platform Notes

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
