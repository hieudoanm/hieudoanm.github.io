# Jasmine Best Practices: Decision Record

Use this record when applying [Jasmine Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for unit testing with Jasmine — the behavior-driven testing framework conventions for JavaScript. Use when writing, structuring, or reviewing Jasmine suites — covers specs, describe/it, matchers, spies, async, and setup.

Jasmine is a **behavior-driven testing framework for JavaScript** — describe/it blocks with rich matchers and spyOn for fakes, no extra dependencies. Practical Jasmine leans on **sub-describe blocks per behavior, readable expect(...).toEqual(...) (avoiding toBe for objects), beforeEach for shared setup, and spies for seams** — mirroring how the object behaves, not how it computes. Tests read as sentences.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Structure & Naming
- [ ] 2. Matchers
- [ ] 3. Spies & Fakes
- [ ] 4. Setup & Teardown
- [ ] 5. Async Specs
- [ ] 6. Running & CI
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

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
