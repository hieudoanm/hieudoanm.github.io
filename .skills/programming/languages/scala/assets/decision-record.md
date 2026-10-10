# Scala Best Practices: Decision Record

Use this record when applying [Scala Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing Scala — the language conventions for Scala 3 applications and libraries. Use when writing, structuring, or reviewing Scala — covers immutability, case classes, null safety, pattern matching, error handling, typed design, futures/concurrency, and tooling.

Scala (3) is a statically-typed, expressive language on the JVM that threads functional and object-oriented style. Practical Scala leans on **immutability as the default, ADTs (enum/case classes) for domain models, exhaustive pattern matching via the compiler**, and **Option/Either/Try over null-and-throw**. The toolchain is opinionated — scalafmt + scalac warnings + a test suite are the review gates, and the compiler is your loudest reviewer.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Immutability & Values
- [ ] 2. Null Safety & Options
- [ ] 3. ADTs & Exhaustive Matching
- [ ] 4. Error Handling
- [ ] 5. Functional Pipelines & Collections
- [ ] 6. Effect Systems & Concurrency
- [ ] 7. Style & Tooling
- [ ] 8. Testing

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
