---
name: "ktor-backend"
description: "Best practices for building HTTP APIs with Ktor (Kotlin). Use when creating, structuring, or reviewing a Ktor app — covers routing, plugins, coroutines, serialization, error handling, authentication, and testing."
tags:
  - "programming"
  - "language"
  - "kotlin"
  - "backend"
  - "ktor"
when_to_use: "Use when creating, structuring, or reviewing a Ktor app."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../go/backend/gin/SKILL.md"
  - "../../../java/backend/javalin/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Ktor Backend Best Practices

Ktor is Kotlin-first, coroutine-native, asynchronous HTTP framework built around routing, a plugin (interceptor) pipeline, and serialization. Best practice here is coroutine-first design: suspend handlers and services, structured concurrency, non-blocking I/O everywhere, explicit plugin wiring, and strict layer separation so Ktor stays an edge layer rather than leaking into domain logic.

## When to use

Use when creating, structuring, or reviewing a Ktor app.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Coroutines end-to-end, never blocking** — suspend handlers, async drivers, explicit dispatchers for background
- **Plugins are the config surface** — install what you use, use what you install
- **Routes thin, services own logic, repositories persist** — the Ktor edge stays replaceable
- **DTOs at every boundary, domains never leak into HTTP** — kotlinx.serialization keeps contracts explicit
- **One StatusPages mapping + explicit auth strategies** — errors and auth are declaratively enforced
- [ ] Application module installs plugins explicitly, then routing modules
- [ ] Routes as Route extensions, RESTful /api/v1/..., correct status codes (201/204/400/404/409)
- [ ] suspend handlers/services; no blocking calls in coroutines; explicit scopes/dispatchers

## Focus areas

- 1. Core Stack
- 2. Application Setup & Plugins
- 3. Routing
- 4. Coroutines & Async Discipline
- 5. Serialization & DTOs
- 6. Error Handling
- 7. Authentication & Authorization
- 8. Reliability & Maintainability
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
