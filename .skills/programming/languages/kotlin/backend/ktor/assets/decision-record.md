# Ktor Backend Best Practices: Decision Record

Use this record when applying [Ktor Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs with Ktor (Kotlin). Use when creating, structuring, or reviewing a Ktor app — covers routing, plugins, coroutines, serialization, error handling, authentication, and testing.

Ktor is Kotlin-first, coroutine-native, asynchronous HTTP framework built around routing, a plugin (interceptor) pipeline, and serialization. Best practice here is coroutine-first design: suspend handlers and services, structured concurrency, non-blocking I/O everywhere, explicit plugin wiring, and strict layer separation so Ktor stays an edge layer rather than leaking into domain logic.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. Application Setup & Plugins
- [ ] 3. Routing
- [ ] 4. Coroutines & Async Discipline
- [ ] 5. Serialization & DTOs
- [ ] 6. Error Handling
- [ ] 7. Authentication & Authorization
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
