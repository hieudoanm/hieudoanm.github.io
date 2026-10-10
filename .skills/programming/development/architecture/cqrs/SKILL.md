---
name: "cqrs-pattern"
description: "Best practices for implementing Command Query Responsibility Segregation (CQRS) pattern. Use when designing, structuring, or reviewing CQRS implementations — covers command handling, query optimization, event sourcing, and eventual consistency."
tags:
  - "programming"
  - "development"
  - "architecture"
  - "cqrs"
  - "pattern"
when_to_use: "Use when designing, structuring, or reviewing CQRS implementations."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../event-driven/SKILL.md"
  - "../hexagonal/SKILL.md"
  - "../microservices/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# CQRS Best Practices

Command Query Responsibility Segregation (CQRS) is a pattern that separates read and write operations for a data store. Best practice is to implement CQRS when you have complex read/write requirements, optimize read models for queries, and handle eventual consistency properly.

## When to use

Use when designing, structuring, or reviewing CQRS implementations.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Separation of concerns** — separate command (write) and query (read) models
- **Optimized read models** — design read models for specific query needs
- **Event-driven updates** — use events to synchronize read models
- **Eventual consistency** — accept eventual consistency between models
- **Scalability** — scale read and write operations independently
- **Separate models** — maintain separate read and write models
- **Optimize reads** — design read models for specific query needs
- **Event-driven** — use events to synchronize models

## Focus areas

- 1. Core Principles
- 2. Architecture Overview
- 3. Command Implementation
- 4. Query Implementation
- 5. Read Model Optimization
- 6. Event Sourcing Integration
- 7. Eventual Consistency
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
