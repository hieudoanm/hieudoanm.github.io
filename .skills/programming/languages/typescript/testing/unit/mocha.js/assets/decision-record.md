# Mocha Best Practices: Decision Record

Use this record when applying [Mocha Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for unit testing with Mocha — the flexible JavaScript test framework conventions. Use when writing, structuring, or reviewing Mocha suites — covers describe/it, hooks, async, assertions (chai), electron/browser runs, and CI.

Mocha is a **flexible test framework** — describe/it structure plus hooks, with assertions delegated to Chai/Assert (expect/should/assert). Practical Mocha leans on **a chosen assertion library up front (Chai's expect is idiomatic), hooks for shared setup, async tested explicitly (async/await or done), and explicit reporter/CI wiring** — the runner stays out of the way. Because Mocha has no built-in matchers, the assertion style is YOUR contract — pick it once.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Structure & Hooks
- [ ] 2. Assertions
- [ ] 3. Async Tests
- [ ] 4. Spies & Stubs
- [ ] 5. Running & CI
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
