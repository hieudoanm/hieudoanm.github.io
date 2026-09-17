---
name: "cpp-best-practices"
description: "Best practices for writing C++ — the language conventions for modern C++ (C++20/23) code. Use when writing, structuring, or reviewing C++ — covers RAII, ownership, move semantics, const correctness, error handling, templates, STL, concurrency, and tooling."
tags:
  - "programming"
  - "language"
  - "c"
  - "cpp"
when_to_use: "Use when writing, structuring, or reviewing C++."
prerequisites:
  - "Basic familiarity with C and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../SKILL.md"
  - "../../csharp/SKILL.md"
  - "../game/unreal/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# C++ Best Practices

Modern C++ (C++20/23) is C with type safety, RAII, move semantics, and the STL bolted on — and the discipline is the product. Practical C++ leans on **RAII for every resource, ownership expressed by types** (unique_ptr/shared_ptr/references), **value semantics with deliberate move paths**, **exceptions for genuine failures (or a single no-exceptions policy)**, and **const correctness enforced by the compiler**. The standard library is a toolkit boundary, not a toybox: prefer it over hand-rolled containers and manual loops.

## When to use

Use when writing, structuring, or reviewing C++.

## Prerequisites

- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **RAII owns everything** — no naked new/delete; resources release on scope exit
- **Ownership is typed** — unique_ptr exclusive, shared_ptr shared-by-meaning, references/views non-owning
- **Value semantics first, move deliberately** — copies are a choice, moves are a choice, both documented
- **const by default** — the compiler is the cheapest reviewer
- **STL over hand-rolled** — containers, algorithms, and ranges from the standard library
- **Exceptions for failures, optional/expected for expected outcomes** — one policy per project
- **Sanitizers + analyzers + -Werror are part of "done"** — like the test suite
- [ ] RAII for all resources; no raw new/delete; make_unique/make_shared

## Focus areas

- 1. RAII & Resource Ownership
- 2. Move Semantics & Value Types
- 3. Const Correctness
- 4. Error Handling
- 5. Types & Interfaces
- 6. STL & Containers
- 7. Templates & Generic Code
- 8. Concurrency
- 9. Build, Tooling & Portability
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
