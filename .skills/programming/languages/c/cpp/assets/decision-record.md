# C++ Best Practices: Decision Record

Use this record when applying [C++ Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing C++ — the language conventions for modern C++ (C++20/23) code. Use when writing, structuring, or reviewing C++ — covers RAII, ownership, move semantics, const correctness, error handling, templates, STL, concurrency, and tooling.

Modern C++ (C++20/23) is C with type safety, RAII, move semantics, and the STL bolted on — and the discipline is the product. Practical C++ leans on **RAII for every resource, ownership expressed by types** (unique_ptr/shared_ptr/references), **value semantics with deliberate move paths**, **exceptions for genuine failures (or a single no-exceptions policy)**, and **const correctness enforced by the compiler**. The standard library is a toolkit boundary, not a toybox: prefer it over hand-rolled containers and manual loops.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. RAII & Resource Ownership
- [ ] 2. Move Semantics & Value Types
- [ ] 3. Const Correctness
- [ ] 4. Error Handling
- [ ] 5. Types & Interfaces
- [ ] 6. STL & Containers
- [ ] 7. Templates & Generic Code
- [ ] 8. Concurrency

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
