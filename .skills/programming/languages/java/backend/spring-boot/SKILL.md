---
name: "spring-boot-backend"
description: "Best practices for building HTTP APIs with Spring Boot (Java). Use when creating, structuring, or reviewing a Spring Boot app — covers layering, DTOs, validation, transactions, exception handling, and security."
tags:
  - "programming"
  - "language"
  - "java"
  - "backend"
  - "spring"
  - "boot"
when_to_use: "Use when creating, structuring, or reviewing a Spring Boot app."
prerequisites:
  - "Basic familiarity with Java and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../javalin/SKILL.md"
  - "../../SKILL.md"
  - "../micronaut/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Spring Boot Backend Best Practices

Spring Boot is a configuration-first Java framework built on Spring MVC, Spring Data, and (optionally) Spring Security. Best practice is disciplined layering — controller/service/repository each with one responsibility — plus DTOs at every API boundary, centralized exception mapping, constructor injection, and explicit transaction and validation boundaries.

## When to use

Use when creating, structuring, or reviewing a Spring Boot app.

## Prerequisites

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Layers stay honest** — thin controllers, business services, thin repositories; domains never cross boundaries as entities
- **Constructor injection** — dependencies explicit via constructor, testable without container magic
- **Validation at the edge via Jakarta annotations; invariants in services** — fail fast, never trust input
- **One @ControllerAdvice, explicit @Transactional, method-level security** — the declarative core of Spring Boot done right
- **DTOs for the API; entities stay internal** — contracts stable, internals free to change
- [ ] Java 17 + Spring Boot 3.x; controller/service/repository/domain layout
- [ ] Constructor injection only; no @Autowired fields, no static bean access, no Lombok by default
- [ ] DTO records at every API boundary; entities never exposed; no internal-ID leaks

## Focus areas

- 1. Core Stack & Constraints
- 2. Layering & Structure
- 3. Dependency Injection
- 4. DTOs at Every API Boundary
- 5. Validation
- 6. Error Handling
- 7. Transactions & Persistence
- 8. Security
- 9. Reliability & Maintainability
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
