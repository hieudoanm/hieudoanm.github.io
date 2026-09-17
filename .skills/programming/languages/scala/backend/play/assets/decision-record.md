# Play Framework Backend Best Practices: Decision Record

Use this record when applying [Play Framework Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs with the Play Framework (Scala). Use when creating, structuring, or reviewing a Play app — covers controllers, services, async boundaries, JSON, dependency injection, and testing.

Play Framework is an async-first Scala web framework built on Akka (classic Akka HTTP engine) with type-safe routing, built-in JSON support, and constructor-based dependency injection. Best practice is async-first design: Future-returning controllers, never blocking the default execution context, constructor-based DI (no globals), DTOs at API boundaries, and explicit failure modeling.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Project Structure & Architecture
- [ ] 3. Controllers (Thin HTTP Layer)
- [ ] 4. Async & Non-Blocking Discipline
- [ ] 5. JSON & DTOs
- [ ] 6. Error Handling
- [ ] 7. Configuration & Portability
- [ ] 8. Security

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
