---
name: "event-driven-architecture"
description: "Best practices for implementing event-driven architecture. Use when designing, structuring, or reviewing event-driven systems — covers event design, messaging patterns, event sourcing, and event processing."
tags:
  - "programming"
  - "development"
  - "architecture"
  - "event"
  - "driven"
when_to_use: "Use when designing, structuring, or reviewing event-driven systems."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../cqrs/SKILL.md"
  - "../microservices/SKILL.md"
  - "../hexagonal/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Event-Driven Architecture Best Practices

Event-driven architecture is a paradigm where components communicate through events. Best practice is to design events carefully, implement proper messaging patterns, handle event ordering and delivery, and ensure system reliability and scalability.

## When to use

Use when designing, structuring, or reviewing event-driven systems.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Loose coupling** — components communicate through events, not direct calls
- **Asynchronous communication** — events are processed asynchronously
- **Event-driven** — system reacts to events rather than polling
- **Scalability** — event-driven systems scale naturally
- **Resilience** — event-driven systems are more resilient to failures
- **Event naming** — use past tense for events
- **Loose coupling** — keep components loosely coupled
- **Asynchronous processing** — process events asynchronously

## Focus areas

- 1. Core Principles
- 2. Event Design
- 3. Messaging Patterns
- 4. Event Processing
- 5. Event Ordering
- 6. Event Delivery
- 7. Event Sourcing
- 8. Monitoring and Observability
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
