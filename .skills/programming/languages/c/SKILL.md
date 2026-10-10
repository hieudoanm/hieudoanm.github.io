---
name: "c-best-practices"
description: "Best practices for writing C — the language conventions for C11/C17 systems and embedded code. Use when writing, structuring, or reviewing C — covers memory ownership, pointer discipline, error handling, strings, modularity, concurrency, and tooling."
tags:
  - "programming"
  - "language"
  - "c"
when_to_use: "Use when writing, structuring, or reviewing C."
prerequisites:
  - "Basic familiarity with C and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "cpp/SKILL.md"
  - "game/unreal/SKILL.md"
  - "ide/clion/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# C Best Practices

C (C11/C17) is a small language with no safety net: manual memory management, no exceptions, no strings, no containers. Practical C leans on **explicit ownership, fail-fast error contracts, and discipline enforced by tooling** — sanitizers and analyzers are not optional extras, they are the code getting reviewed. Every function signature is a contract: parameters in, results out, errors up.

## When to use

Use when writing, structuring, or reviewing C.

## Prerequisites

- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Ownership is a property of the design, not the code** — write it down: who allocates, who frees, who borrows
- **Bounds are always known** — length + pointer everywhere; bounded copy/compare/format is the only safe default
- **Errors are return values** — contract per function, fail fast, unwind cleanly, never leak on error
- **Const by default** — read-only pointers are the default until there's a reason to mutate
- **Sanitizers + analyzers + -Werror are part of "done"** — like any other test suite
- **Small functions, opaque types, static helpers** — modularity that survives review
- [ ] Ownership/lifetime documented per allocation; free in the layer that allocates
- [ ] Pointer + size pairs everywhere; NULL checked on every allocation/parameter

## Focus areas

- 1. Memory Ownership & Lifetime
- 2. Pointer & Array Discipline
- 3. Types, Qualifiers & Integers
- 4. Error Handling
- 5. Strings
- 6. Functions & Modularity
- 7. Structs & Data Design
- 8. Concurrency & Threading
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
