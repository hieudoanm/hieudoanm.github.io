---
name: "kotlin-best-practices"
description: "Idiomatic Kotlin best practices covering project structure, null safety, immutability, classes, coroutines and Flow, error handling, testing, and tooling. Use when writing, structuring, or reviewing Kotlin code."
tags:
  - "programming"
  - "language"
  - "kotlin"
when_to_use: "Use when writing, structuring, or reviewing Kotlin code."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "backend/ktor/SKILL.md"
  - "ui/compose/SKILL.md"
  - "cli/clikt/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Kotlin Best Practices

Kotlin is a modern, pragmatic JVM (and multiplatform) language: null-safety, immutability, and first-class coroutines push most of the classic Java failure modes out of the language. "Best practice" here is about leaning into those features — val over var, sealed hierarchies over if chains, structured concurrency over raw threads — so problems become unrepresentable instead of just handled carefully.

## When to use

Use when writing, structuring, or reviewing Kotlin code.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Let the compiler enforce correctness.** sealed + when, immutable val data classes, non-null types — design so invalid states are _unrepresentable_, not just caught late
- **Prefer interfaces for dependencies, constructor injection everywhere** — class Service(repo: Repository); avoid singletons (object), service locators, and global mutable state the tests then have to reset
- **Small, single-purpose functions** — if a function needs a paragraph to explain, it's probably doing three jobs
- **Explicit over implicit where it costs nothing** — type annotations on public API, named arguments at complex call sites
- **when over nested if/else** — exhaustive, flat, and linear to read
- **Keep coroutine scopes explicit and lifecycle-bound** — no fire-and-forget launch without a parent scope that outlives the work
- **Consistency over cleverness** — use the idioms every Kotlin dev expects (data class, sealed hierarchies, Flow, builders) before reaching for exotic patterns
- [ ] val by default; every var justified

## Focus areas

- 1. Project Structure
- 2. Null Safety
- 3. Classes & Type Design
- 4. Error Handling
- 5. Coroutines & Structured Concurrency
- 6. Flow & Reactive Patterns
- 7. Idioms: Scope Functions & Builders
- 8. Extension Functions & DSL
- 9. Testing
- 10. Tooling (Non-negotiable)

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
