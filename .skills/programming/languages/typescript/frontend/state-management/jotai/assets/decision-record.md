# Jotai Best Practices: Decision Record

Use this record when applying [Jotai Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for state management with Jotai — the primitive-atomic conventions for React state. Use when writing, structuring, or reviewing Jotai — covers atoms, derived atoms, async atoms, persistence, selectors, and testing.

Jotai is an **atomic state library** — every piece of state is an atom([])/atom(value) with fine-grained subscriptions; components read with useAtomValue and write with useSetAtom/useAtom. Practical Jotai leans on **small atoms (one concept each), derived atoms for computed state (no manual syncing), async atoms for data that arrives outside React**, and **Provider scoping for testability and multi-store pages**. "Atom = the smallest useful unit of truth" is the discipline.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Atoms & Basic Usage
- [ ] 2. Derived Atoms
- [ ] 3. Async Atoms
- [ ] 4. Persistence
- [ ] 5. Selectors & Performance
- [ ] 6. Providers & Testability
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
