# Cypress Best Practices: Decision Record

Use this record when applying [Cypress Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for end-to-end testing with Cypress — the browser automation conventions for web apps. Use when writing, structuring, or reviewing Cypress suites — covers commands, selectors, waiting, API stubbing, parallel CI, and reliability patterns.

Cypress runs **real browser E2E tests** with an interactive runner and commands that auto-retry. Practical Cypress leans on **user-centric selectors (data-testid/roles), commands that mirror user intent (interact, assert), explicit waits avoided (auto-retry does the work), and API/network stubbing to keep tests deterministic.** Reliability is the product — a flaky suite is worse than none.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Selectors & Queries
- [ ] 2. Interacting & Asserting
- [ ] 3. Network & API Stubbing
- [ ] 4. Data & Setup
- [ ] 5. Waiting & Flakiness
- [ ] 6. Structure & CI
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
