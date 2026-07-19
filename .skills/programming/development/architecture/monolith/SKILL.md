---
name: "monolith-architecture"
description: "Best practices for designing and implementing monolithic applications. Use when planning, structuring, or reviewing monolithic architecture — covers module organization, scalability, maintainability, and evolution strategies."
tags:
  - "programming"
  - "development"
  - "architecture"
  - "monolith"
when_to_use: "Use when planning, structuring, or reviewing monolithic architecture."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../microservices/SKILL.md"
  - "../cqrs/SKILL.md"
  - "../event-driven/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Monolithic Architecture Best Practices

Monolithic architecture is a traditional software design where the application is built as a single, unified unit. Best practice is to structure monoliths with clear module boundaries, implement proper separation of concerns, and design for eventual evolution into microservices if needed.

## When to use

Use when planning, structuring, or reviewing monolithic architecture.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Single deployment unit** — entire application deployed as one unit
- **Shared database** — typically uses a single database
- **Clear module boundaries** — well-defined interfaces between modules
- **Layered architecture** — presentation, business, and data layers
- **Evolutionary design** — structure for potential future decomposition
- **Clear module boundaries** — define and respect module boundaries
- **Layered architecture** — maintain clear separation between layers
- **Domain-driven design** — organize around business domains

## Focus areas

- 1. Core Principles
- 2. Project Structure
- 3. Module Organization
- 4. Database Design
- 5. API Design
- 6. Scalability Strategies
- 7. Maintainability
- 8. Evolution to Microservices
- 9. Security
- 10. Deployment

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
