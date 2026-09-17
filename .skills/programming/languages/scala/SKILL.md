---
name: "scala-best-practices"
description: "Best practices for writing Scala — the language conventions for Scala 3 applications and libraries. Use when writing, structuring, or reviewing Scala — covers immutability, case classes, null safety, pattern matching, error handling, typed design, futures/concurrency, and tooling."
tags:
  - "programming"
  - "language"
  - "scala"
when_to_use: "Use when writing, structuring, or reviewing Scala."
prerequisites:
  - "Basic familiarity with Scala and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "backend/http4s/SKILL.md"
  - "../csharp/SKILL.md"
  - "../php/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Scala Best Practices

Scala (3) is a statically-typed, expressive language on the JVM that threads functional and object-oriented style. Practical Scala leans on **immutability as the default, ADTs (enum/case classes) for domain models, exhaustive pattern matching via the compiler**, and **Option/Either/Try over null-and-throw**. The toolchain is opinionated — scalafmt + scalac warnings + a test suite are the review gates, and the compiler is your loudest reviewer.

## When to use

Use when writing, structuring, or reviewing Scala.

## Prerequisites

- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **val/immutable first; mutation is the exception with a name.**
- **Model the domain as case classes + sealed enums; the compiler exhaustivises your match.**
- **Option/Either/Try over null-and-throw; convert at the boundary once.**
- **Pure helpers compose; effects stay at the edges.**
- **scalafmt + -Werror + property tests are part of "done".**
- [ ] case class/enum ADTs; opaque type for distinct values; val default
- [ ] Option/Either/for-comprehensions; no bare .get; null only at interop
- [ ] Exhaustive match on sealed forms; guards ordered deliberately

## Focus areas

- 1. Immutability & Values
- 2. Null Safety & Options
- 3. ADTs & Exhaustive Matching
- 4. Error Handling
- 5. Functional Pipelines & Collections
- 6. Effect Systems & Concurrency
- 7. Style & Tooling
- 8. Testing
- 9. Performance

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
