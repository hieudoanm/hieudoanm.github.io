---
name: "solidjs-best-practices"
description: "Best practices for building web applications with SolidJS. Use when creating, structuring, or reviewing SolidJS applications — covers reactivity, components, stores, routing, and performance."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "solid"
  - "solidjs"
when_to_use: "Use when creating, structuring, or reviewing SolidJS applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../svelte/SKILL.md"
  - "../angular/SKILL.md"
  - "../astro/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# SolidJS Best Practices

SolidJS is a reactive JavaScript framework for building user interfaces. Best practice is to leverage Solid's fine-grained reactivity, use signals for state management, avoid unnecessary re-renders, and follow Solid's reactive patterns.

## When to use

Use when creating, structuring, or reviewing SolidJS applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Fine-grained reactivity** — leverage Solid's reactive system
- **Signals for state** — use signals for reactive state
- **TypeScript** — use TypeScript for type safety
- **Performance** — Solid is already performant, avoid premature optimization
- **Component composition** — use children prop for composition
- **Context for sharing** — use context for sharing state across components
- [ ] SolidJS with TypeScript strict mode
- [ ] Signals for reactive state management

## Focus areas

- 1. Core Stack
- 2. Component Structure
- 3. Reactivity
- 4. Components & JSX
- 5. State Management
- 6. Routing
- 7. Performance
- 8. Styling
- 9. Lifecycle
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
