# Quarkus Best Practices: Decision Record

Use this record when applying [Quarkus Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Java/Kotlin services with Quarkus — the Kubernetes-native, GraalVM-friendly framework conventions. Use when writing, structuring, or reviewing Quarkus — covers platform/profile setup, CDI, REST/RESTeasy, reactive/imperative URIs, config, Panache/data, testing, and native binary builds.

Quarkus is a Kubernetes-native Java framework optimized for **GraalVM native images and fast startup**, with **JAX-RS/CDI-like standards under a reactive core** (Mutiny, Vert.x). Practical Quarkus leans on **@QuarkusTest for testing, @ApplicationScoped CDI beans, REST resources with Panache/Hibernate for data**, and **clean config via application.properties + env mapping**. Dev-first: quarkus dev restarts instantly, and native builds are the deployment contract.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Project & Platform Setup
- [ ] 2. Dependency Injection (ArC)
- [ ] 3. REST Resources
- [ ] 4. Configuration & Secrets
- [ ] 5. Data Access (Panache)
- [ ] 6. Reactive & Messaging
- [ ] 7. Observability
- [ ] 8. Testing & Native

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
