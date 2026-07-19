---
name: "gin-backend"
description: "Best practices for building HTTP APIs with Gin (Go). Use when creating, structuring, or reviewing a Gin app — covers routing, middleware, context, validation, error handling, and testing."
tags:
  - "programming"
  - "language"
  - "go"
  - "backend"
  - "gin"
when_to_use: "Use when creating, structuring, or reviewing a Gin app."
prerequisites:
  - "Basic familiarity with Go and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../chi/SKILL.md"
  - "../echo/SKILL.md"
  - "../gorilla/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Gin Backend Best Practices

Gin is a fast, middleware-based HTTP framework for Go built on net/http. It keeps Go's explicitness (interfaces, context.Context, explicit errors) while adding routing, middleware, and JSON convenience. Best practice is standard-library-first: thin handlers, services own business logic, repositories own persistence, and business logic never appears in middleware.

## When to use

Use when creating, structuring, or reviewing a Gin app.

## Prerequisites

- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Standard library first** — net/http, context, database/sql; Gin is routing/middleware sugar, not a runtime
- **Layers by responsibility** — handler/service/repository; interfaces only at boundaries where substitution matters
- **Middleware is cross-cutting only** — never business logic
- **Errors are explicit and mapped once** — if err != nil in handlers, statusFrom for HTTP
- **Validation at the edge, invariants in services** — fail fast, never trust input
- [ ] handler/service/repository/domain layers; thin handlers with no business logic
- [ ] RESTful /api/v1/...; routes composed visibly in main/router factory
- [ ] context.Context propagated handler → service → repository; timeouts applied

## Focus areas

- 1. Core Stack
- 2. Project Structure & Routing
- 3. Handlers & Middleware
- 4. Middleware Patterns
- 5. Validation
- 6. Error Handling
- 7. Security
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
