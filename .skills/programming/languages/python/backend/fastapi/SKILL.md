---
name: "fastapi-backend"
description: "Best practices for building HTTP APIs with FastAPI (Python). Use when creating, structuring, or reviewing a FastAPI app — covers routing, Pydantic models, dependency injection, async discipline, error handling, and testing."
tags:
  - "programming"
  - "language"
  - "python"
  - "backend"
  - "fastapi"
when_to_use: "Use when creating, structuring, or reviewing a FastAPI app."
prerequisites:
  - "Basic familiarity with Python and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../django/SKILL.md"
  - "../flask/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# FastAPI Backend Best Practices

FastAPI is an async-first, standards-based Python framework built on Starlette and Pydantic v2: type-annotated request/response models drive validation, serialization, generated OpenAPI docs, and dependency injection. Best practice here is about keeping route handlers thin, modelling every API boundary with Pydantic (never exposing ORM models), validating input declaratively, and keeping I/O-bound endpoints async without ever blocking the event loop.

## When to use

Use when creating, structuring, or reviewing a FastAPI app.

## Prerequisites

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Every API boundary is a Pydantic model** — request in, response out, and never raw ORM objects
- **Thin routes, services own the logic** — routes wire HTTP→service→schema; services are plain callables/testable
- **Async where I/O-bound, sync-in-threadpool where CPU-bound** — mixing them wrong is the #1 perf bug in FastAPI
- **DI via Depends** encodes what a route needs in its signature
- **One error-handling layer** centralizes validation + domain-error → HTTP mapping
- [ ] api/routers + schemas + services + repositories layout; routers in main.py via APIRouter(prefix=...)
- [ ] RESTful /api/v1/... naming; thin route handlers with no business logic
- [ ] Pydantic v2 request/response models at every boundary; from_attributes=True for ORM mapping

## Focus areas

- 1. Core Stack
- 2. Project Structure & Routing
- 3. Pydantic Models at Every Boundary
- 4. Dependency Injection
- 5. Async & Concurrency
- 6. Error Handling
- 7. Security & Validation
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
