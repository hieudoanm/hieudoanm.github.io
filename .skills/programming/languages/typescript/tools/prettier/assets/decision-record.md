# Prettier: Decision Record

Use this record when applying [Prettier](../SKILL.md) to a concrete project decision.

## Context

Best practices for formatting JavaScript and TypeScript with Prettier — configuration, intentional non-formatting, plugin selection, ESLint integration, and CI enforcement. Use when setting up, structuring, or debugging a Prettier setup.

Prettier is a **formatter**, not a linter. It parses your code and prints it back with a single canonical style, which is the whole point: it removes an entire category of code review. Practical Prettier work is mostly about **one formatter in the repo, a config that matches the house style, and knowing what Prettier deliberately does not do** — while linting belongs to eslint.md, and the alternative single-tool approach is biome.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Configuration
- [ ] 2. What Prettier Does Not Do
- [ ] 3. Suppressing Formatting
- [ ] 4. Plugins
- [ ] 5. ESLint Integration
- [ ] 6. Scripts & Editor
- [ ] 7. Speed
- [ ] 8. Migrating to Biome (or Back)

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
