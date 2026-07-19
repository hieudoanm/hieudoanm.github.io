# FastAPI Backend Best Practices: Decision Record

Use this record when applying [FastAPI Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs with FastAPI (Python). Use when creating, structuring, or reviewing a FastAPI app — covers routing, Pydantic models, dependency injection, async discipline, error handling, and testing.

FastAPI is an async-first, standards-based Python framework built on Starlette and Pydantic v2: type-annotated request/response models drive validation, serialization, generated OpenAPI docs, and dependency injection. Best practice here is about keeping route handlers thin, modelling every API boundary with Pydantic (never exposing ORM models), validating input declaratively, and keeping I/O-bound endpoints async without ever blocking the event loop.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. Project Structure & Routing
- [ ] 3. Pydantic Models at Every Boundary
- [ ] 4. Dependency Injection
- [ ] 5. Async & Concurrency
- [ ] 6. Error Handling
- [ ] 7. Security & Validation
- [ ] 8. Reliability & Maintainability

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
