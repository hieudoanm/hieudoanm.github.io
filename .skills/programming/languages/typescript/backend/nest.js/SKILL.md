---
name: "nest-backend"
description: "Best practices for building structured, maintainable server applications with NestJS (TypeScript). Use when creating, structuring, or reviewing a NestJS app — covers modules, providers/DI, controllers, DTOs and pipes, guards/interceptors, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "backend"
  - "nest"
  - "js"
when_to_use: "Use when creating, structuring, or reviewing a NestJS app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../hono.js/SKILL.md"
  - "../express.js/SKILL.md"
  - "../fastify.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# NestJS Backend Best Practices

NestJS is a batteries-included, architecture-first TypeScript framework: **modules** + dependency injection, **controllers** for HTTP, **providers** for logic, and decorator-driven **guards/pipes/interceptors**. Unlike the minimal routers (Express/Fastify adapters), Nest rewards deliberate structure — a Nest app is a graph of modules where every capability is an injectable, tested unit. Best practice here is about respecting the DI/module boundaries, letting pipes/guards do the cross-cutting work, and keeping controllers thin.

## When to use

Use when creating, structuring, or reviewing a NestJS app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Architecture is the product** — Nest's value is the shape (modules, DI, pipes/guards); keep the graph explicit and layered rather than carving shortcuts
- **Controllers thin, services testable, repos at the edge** — the triangle that makes each layer replaceable
- **Cross-cutting happens in decorators** — validation (pipes), auth (guards), shaping (interceptors); handlers stay declarative
- **DTOs are contracts** — typed, validated at the edge, compiled-checked downstream
- **Exceptions not statuses** — throw domain/exceptions; filters shape; services stay HTTP-agnostic
- [ ] One concern per module; DI graph a DAG; providers exported deliberately
- [ ] Controllers thin; services throw domain exceptions (never res)
- [ ] DTOs + class-validator with global ValidationPipe (whitelist, forbidNonWhitelisted)

## Focus areas

- 1. Core Stack
- 2. Modules & Dependency Injection
- 3. Controllers (Thin HTTP Layer)
- 4. DTOs, Pipes & Validation
- 5. Guards, Interceptors & Middleware
- 6. Error Handling
- 7. Data & Services
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
