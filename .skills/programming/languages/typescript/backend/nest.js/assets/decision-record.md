# NestJS Backend Best Practices: Decision Record

Use this record when applying [NestJS Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building structured, maintainable server applications with NestJS (TypeScript). Use when creating, structuring, or reviewing a NestJS app — covers modules, providers/DI, controllers, DTOs and pipes, guards/interceptors, and testing.

NestJS is a batteries-included, architecture-first TypeScript framework: **modules** + dependency injection, **controllers** for HTTP, **providers** for logic, and decorator-driven **guards/pipes/interceptors**. Unlike the minimal routers (Express/Fastify adapters), Nest rewards deliberate structure — a Nest app is a graph of modules where every capability is an injectable, tested unit. Best practice here is about respecting the DI/module boundaries, letting pipes/guards do the cross-cutting work, and keeping controllers thin.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. Modules & Dependency Injection
- [ ] 3. Controllers (Thin HTTP Layer)
- [ ] 4. DTOs, Pipes & Validation
- [ ] 5. Guards, Interceptors & Middleware
- [ ] 6. Error Handling
- [ ] 7. Data & Services
- [ ] 8. Testing

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
