# Micronaut Best Practices: Decision Record

Use this record when applying [Micronaut Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Java microservices with Micronaut — the compile-time AOT-oriented framework conventions. Use when writing, structuring, or reviewing Micronaut — covers annotations/wiring, routing, DI, configuration, validation, data, testing, and observability.

Micronaut is a compile-time, annotation-driven JVM framework — **dependency injection, configuration, and validation resolved at compile time, not runtime reflection**, giving fast startup and low memory. Practical Micronaut leans on **constructor injection with @Singleton/@Inject, @Controller route classes, @ConfigurationProperties/@Configuration for typed config**, and **Micronaut Data / validation annotations** at the boundaries. The AOT angle means the wiring errors you'd catch at runtime become compile-time errors.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Application & Bootstrapping
- [ ] 2. Routing & Handlers
- [ ] 3. Dependency Injection
- [ ] 4. Configuration
- [ ] 5. Validation & Error Handling
- [ ] 6. Data (Micronaut Data / JDBC)
- [ ] 7. Observability
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
