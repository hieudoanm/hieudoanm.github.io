---
name: "play-backend"
description: "Best practices for building HTTP APIs with the Play Framework (Scala). Use when creating, structuring, or reviewing a Play app — covers controllers, services, async boundaries, JSON, dependency injection, and testing."
tags:
  - "programming"
  - "language"
  - "scala"
  - "backend"
  - "play"
when_to_use: "Use when creating, structuring, or reviewing a Play app."
prerequisites:
  - "Basic familiarity with Scala and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../http4s/SKILL.md"
  - "../../SKILL.md"
  - "../akka/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Play Framework Backend Best Practices

Play Framework is an async-first Scala web framework built on Akka (classic Akka HTTP engine) with type-safe routing, built-in JSON support, and constructor-based dependency injection. Best practice is async-first design: Future-returning controllers, never blocking the default execution context, constructor-based DI (no globals), DTOs at API boundaries, and explicit failure modeling.

## When to use

Use when creating, structuring, or reviewing a Play app.

## Prerequisites

- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Future end-to-end, never blocked** — compose; reserve Await for tests/main entry only
- **Controllers orchestrate, services decide, repositories persist** — Play stays at the edge
- **Constructor injection, no global state** — explicit dependencies, testable layers
- **DTOs at the boundary, JSON via one library** — stable contracts, domain stays portable
- **One error mapper, explicit validation, real HTTP codes** — the fail-fast, no-leak contract
- [ ] Scala 2.13+/3 + Play LTS; controllers/services/repositories/models layering
- [ ] @Inject() constructor injection; no object singletons for state
- [ ] Action.async + Future services; no blocking on the default EC; explicit dispatchers

## Focus areas

- 1. Core Stack & Constraints
- 2. Project Structure & Architecture
- 3. Controllers (Thin HTTP Layer)
- 4. Async & Non-Blocking Discipline
- 5. JSON & DTOs
- 6. Error Handling
- 7. Configuration & Portability
- 8. Security
- 9. Reliability & Maintainability
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
