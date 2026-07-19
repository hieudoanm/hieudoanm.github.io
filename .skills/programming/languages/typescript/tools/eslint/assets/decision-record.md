# ESLint: Decision Record

Use this record when applying [ESLint](../SKILL.md) to a concrete project decision.

## Context

Best practices for linting JavaScript and TypeScript with ESLint — flat config, typed linting, rule strategy, plugin selection, monorepo overrides, and CI gating. Use when setting up, structuring, or debugging an ESLint configuration.

ESLint is the de facto linter for JavaScript and TypeScript. Its value is not style enforcement — that is prettier.md's job — but **catching whole classes of bug** (unhandled promises, unsafe any, broken hook rules, shadowed globals) statically. Practical ESLint work leans on **flat config with defineConfig, type-aware linting via projectService, and a deliberately small rule set** — while language-level type guidance lives in typescript.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Flat Config Is the Only Format
- [ ] 2. TypeScript Integration
- [ ] 3. Typed Linting (the High-Value Part)
- [ ] 4. Rule Strategy
- [ ] 5. Monorepos & Overrides
- [ ] 6. Plugin Selection
- [ ] 7. Editor & Pre-Commit
- [ ] 8. CI

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
