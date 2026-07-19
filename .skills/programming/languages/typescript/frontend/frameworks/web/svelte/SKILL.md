---
name: "svelte-best-practices"
description: "Best practices for building web applications with Svelte. Use when creating, structuring, or reviewing Svelte applications — covers components, reactivity, stores, routing, and performance."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "svelte"
when_to_use: "Use when creating, structuring, or reviewing Svelte applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../solid/SKILL.md"
  - "../angular/SKILL.md"
  - "../astro/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Svelte Best Practices

Svelte is a component framework that compiles your code at build time, resulting in highly efficient vanilla JavaScript. Best practice is to leverage Svelte's reactivity system, use stores for state management, follow component patterns, and optimize for performance.

## When to use

Use when creating, structuring, or reviewing Svelte applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Reactivity** — leverage Svelte's reactivity system
- **Stores** — use stores for state management
- **TypeScript** — use TypeScript for type safety
- **Performance** — Svelte is already performant
- **Component composition** — use slots for composition
- **Testing** — test components with Testing Library
- [ ] Svelte with TypeScript strict mode
- [ ] Reactive statements with $:

## Focus areas

- 1. Core Stack
- 2. Component Structure
- 3. Reactivity
- 4. Props and Slots
- 5. State Management
- 6. Lifecycle
- 7. Events
- 8. Routing
- 9. Performance
- 10. Styling
- 11. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
