---
name: "micronaut-best-practices"
description: "Best practices for building Java microservices with Micronaut — the compile-time AOT-oriented framework conventions. Use when writing, structuring, or reviewing Micronaut — covers annotations/wiring, routing, DI, configuration, validation, data, testing, and observability."
tags:
  - "programming"
  - "language"
  - "java"
  - "backend"
  - "micronaut"
when_to_use: "Use when writing, structuring, or reviewing Micronaut."
prerequisites:
  - "Basic familiarity with Java and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../helidon/SKILL.md"
  - "../javalin/SKILL.md"
  - "../quarkus/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Micronaut Best Practices

Micronaut is a compile-time, annotation-driven JVM framework — **dependency injection, configuration, and validation resolved at compile time, not runtime reflection**, giving fast startup and low memory. Practical Micronaut leans on **constructor injection with @Singleton/@Inject, @Controller route classes, @ConfigurationProperties/@Configuration for typed config**, and **Micronaut Data / validation annotations** at the boundaries. The AOT angle means the wiring errors you'd catch at runtime become compile-time errors.

## When to use

Use when writing, structuring, or reviewing Micronaut.

## Prerequisites

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Constructor injection; compile-time bean resolution is the Micronaut superpower.**
- **Routes via @Controller; typed params with validation at the boundary.**
- **@ConfigurationProperties typed config; config validated at startup.**
- **Validation + exception-mapping once; fail fast before side effects.**
- **Micronaut Data derived queries; RBAC expected, N+1 avoided.**
- **Health/metrics/logging wired early; @MicronautTest + seam fakes.**
- [ ] @Singleton/@RequestScope chosen by state; constructor injection everywhere
- [ ] @Controller per resource; typed @PathVariable/@Body params

## Focus areas

- 1. Application & Bootstrapping
- 2. Routing & Handlers
- 3. Dependency Injection
- 4. Configuration
- 5. Validation & Error Handling
- 6. Data (Micronaut Data / JDBC)
- 7. Observability
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
