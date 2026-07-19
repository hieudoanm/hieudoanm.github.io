# Testing Library Best Practices: Decision Record

Use this record when applying [Testing Library Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for React/DOM testing with Testing Library — the user-centric testing conventions. Use when writing, structuring, or reviewing Testing Library suites — covers queries, roles, userEvent/fireEvent, async, and anti-patterns.

Testing Library tests the **behavior users experience — roles, labels, text — not implementation details** (getByRole over class/state assertions). Practical Testing Library leans on **accessible queries (*ByRole, *ByLabelText, *ByText), userEvent for interaction (over fireEvent), screen.getByX in preference to destructured queries, and waitFor/findBy for async settling** — the "don't test implementation" rule keeps the suite stepping with refactors.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Queries & the User's Eye
- [ ] 2. Expect + User Events
- [ ] 3. Async & Waiting
- [ ] 4. Anti-Patterns
- [ ] 5. Rendering & Cleanup
- [ ] 6. Accessible-by-Design
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
