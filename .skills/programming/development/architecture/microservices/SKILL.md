---
name: "microservices-architecture"
description: "Best practices for designing and implementing microservices architecture. Use when planning, structuring, or reviewing microservices — covers service design, communication, data management, and operational concerns."
tags:
  - "programming"
  - "development"
  - "architecture"
  - "microservices"
when_to_use: "Use when planning, structuring, or reviewing microservices."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../event-driven/SKILL.md"
  - "../hexagonal/SKILL.md"
  - "../monolith/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Microservices Architecture Best Practices

Microservices architecture is an approach where applications are structured as a collection of loosely coupled services. Best practice is to design services around business domains, implement proper communication patterns, manage data appropriately, and handle operational complexity effectively.

## When to use

Use when planning, structuring, or reviewing microservices.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Single responsibility** — each service handles one business capability
- **Loose coupling** — services are independent and can evolve separately
- **High cohesion** — related functionality is grouped together
- **Independent deployment** — services can be deployed independently
- **Technology diversity** — services can use different technologies
- **Single responsibility** — each service has one clear purpose
- **Database per service** — each service owns its data
- **Asynchronous communication** — prefer async over sync where possible

## Focus areas

- 1. Core Principles
- 2. Service Design
- 3. Service Communication
- 4. Data Management
- 5. Service Discovery
- 6. Configuration Management
- 7. Observability
- 8. Security
- 9. Deployment
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
