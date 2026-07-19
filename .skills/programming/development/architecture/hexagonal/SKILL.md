---
name: "hexagonal-architecture"
description: "Best practices for implementing hexagonal (ports and adapters) architecture. Use when designing, structuring, or reviewing hexagonal architecture — covers domain isolation, port interfaces, adapter implementations, and dependency management."
tags:
  - "programming"
  - "development"
  - "architecture"
  - "hexagonal"
when_to_use: "Use when designing, structuring, or reviewing hexagonal architecture."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../cqrs/SKILL.md"
  - "../microservices/SKILL.md"
  - "../event-driven/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Hexagonal Architecture Best Practices

Hexagonal architecture, also known as ports and adapters, is a pattern that isolates the core domain logic from external concerns. Best practice is to define clear port interfaces, implement adapters for external systems, and maintain strict dependency rules.

## When to use

Use when designing, structuring, or reviewing hexagonal architecture.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Domain isolation** — core domain logic is isolated from external concerns
- **Port interfaces** — define interfaces for external interactions
- **Adapter implementations** — implement adapters for external systems
- **Dependency inversion** — dependencies point inward toward the domain
- **Testability** — core logic is easily testable without external dependencies
- **Domain isolation** — keep domain logic isolated
- **Port interfaces** — define clear port interfaces
- **Dependency inversion** — dependencies point inward

## Focus areas

- 1. Core Principles
- 2. Architecture Overview
- 3. Domain Layer
- 4. Port Interfaces
- 5. Adapter Implementations
- 6. Application Services
- 7. Dependency Management
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
