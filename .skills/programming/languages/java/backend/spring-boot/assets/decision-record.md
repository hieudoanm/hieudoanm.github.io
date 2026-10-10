# Spring Boot Backend Best Practices: Decision Record

Use this record when applying [Spring Boot Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs with Spring Boot (Java). Use when creating, structuring, or reviewing a Spring Boot app — covers layering, DTOs, validation, transactions, exception handling, and security.

Spring Boot is a configuration-first Java framework built on Spring MVC, Spring Data, and (optionally) Spring Security. Best practice is disciplined layering — controller/service/repository each with one responsibility — plus DTOs at every API boundary, centralized exception mapping, constructor injection, and explicit transaction and validation boundaries.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Layering & Structure
- [ ] 3. Dependency Injection
- [ ] 4. DTOs at Every API Boundary
- [ ] 5. Validation
- [ ] 6. Error Handling
- [ ] 7. Transactions & Persistence
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
