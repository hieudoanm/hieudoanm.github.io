# C Best Practices: Decision Record

Use this record when applying [C Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing C — the language conventions for C11/C17 systems and embedded code. Use when writing, structuring, or reviewing C — covers memory ownership, pointer discipline, error handling, strings, modularity, concurrency, and tooling.

C (C11/C17) is a small language with no safety net: manual memory management, no exceptions, no strings, no containers. Practical C leans on **explicit ownership, fail-fast error contracts, and discipline enforced by tooling** — sanitizers and analyzers are not optional extras, they are the code getting reviewed. Every function signature is a contract: parameters in, results out, errors up.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Memory Ownership & Lifetime
- [ ] 2. Pointer & Array Discipline
- [ ] 3. Types, Qualifiers & Integers
- [ ] 4. Error Handling
- [ ] 5. Strings
- [ ] 6. Functions & Modularity
- [ ] 7. Structs & Data Design
- [ ] 8. Concurrency & Threading

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
