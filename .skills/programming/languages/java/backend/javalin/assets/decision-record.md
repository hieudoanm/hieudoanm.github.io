# Javalin Best Practices: Decision Record

Use this record when applying [Javalin Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Java web APIs with Javalin — the lightweight Kotlin-originated HTTP framework conventions for Java. Use when writing, structuring, or reviewing Javalin — covers app setup, handlers, routing/context, middleware, validation, error handling, testing, and deployment.

Javalin is a lightweight, opinionated HTTP framework with a **handler signature Handler(ctx) on a single Context** — routing, params, JSON, WebSockets, and error handling all flow through one object. Practical Javalin leans on **app.get/post/route(...) builders, handler registration with use middleware layers, ctx.queryParam/pathParam/bodyAsClass typed access**, and **exceptionHandler mapping exceptions to responses**. Javalin's smallest surface makes "everything is a Context method" the discipline.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. App Setup & Wiring
- [ ] 2. Handlers & Context
- [ ] 3. Middleware & Filters
- [ ] 4. Validation & Errors
- [ ] 5. Context & Request State
- [ ] 6. WebSockets (when needed)
- [ ] 7. Testing
- [ ] General Rules of Thumb

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
