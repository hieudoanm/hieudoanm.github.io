---
name: "quarkus-best-practices"
description: "Best practices for building Java/Kotlin services with Quarkus — the Kubernetes-native, GraalVM-friendly framework conventions. Use when writing, structuring, or reviewing Quarkus — covers platform/profile setup, CDI, REST/RESTeasy, reactive/imperative URIs, config, Panache/data, testing, and native binary builds."
tags:
  - "programming"
  - "language"
  - "java"
  - "backend"
  - "quarkus"
when_to_use: "Use when writing, structuring, or reviewing Quarkus."
prerequisites:
  - "Basic familiarity with Java and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../helidon/SKILL.md"
  - "../javalin/SKILL.md"
  - "../micronaut/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Quarkus Best Practices

Quarkus is a Kubernetes-native Java framework optimized for **GraalVM native images and fast startup**, with **JAX-RS/CDI-like standards under a reactive core** (Mutiny, Vert.x). Practical Quarkus leans on **@QuarkusTest for testing, @ApplicationScoped CDI beans, REST resources with Panache/Hibernate for data**, and **clean config via application.properties + env mapping**. Dev-first: quarkus dev restarts instantly, and native builds are the deployment contract.

## When to use

Use when writing, structuring, or reviewing Quarkus.

## Prerequisites

- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Extensions = architecture; the platform is the dependency policy.**
- **Constructor-injected CDI beans; small resource classes; validation at the boundary.**
- **Config via application.properties + env; @ConfigMapping for typed grouped settings; secrets never in code.**
- **Panache for CRUD; complex queries explicit @Query; pagination in SQL.**
- **QuarkusTest-driven development; native build is the deployable contract.**
- **Health/metrics/tracing wired once; reactive only where the profile demands it.**
- [ ] Parent quarkus-bom; extensions only; profiles (%dev./%prod.) for config
- [ ] CDI beans by state; constructor injection; @Startup only for eager init

## Focus areas

- 1. Project & Platform Setup
- 2. Dependency Injection (ArC)
- 4. Configuration & Secrets
- 5. Data Access (Panache)
- 6. Reactive & Messaging
- 7. Observability
- 8. Testing & Native

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
