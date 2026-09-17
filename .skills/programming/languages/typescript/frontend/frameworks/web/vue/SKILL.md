---
name: "vue-best-practices"
description: "Best practices for building web applications with Vue.js. Use when creating, structuring, or reviewing Vue applications — covers components, composition API, state management, performance, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "vue"
when_to_use: "Use when creating, structuring, or reviewing Vue applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../react/SKILL.md"
  - "../angular/SKILL.md"
  - "../nuxt/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Vue.js Best Practices

Vue.js is a progressive JavaScript framework for building user interfaces. Best practice is to leverage the Composition API, use TypeScript for type safety, maintain clear component structure, and follow Vue's reactivity system properly.

## When to use

Use when creating, structuring, or reviewing Vue applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Composition API** — prefer Composition API over Options API
- **TypeScript** — use TypeScript for type safety
- **Single File Components** — use SFC for component organization
- **Pinia for state** — use Pinia for global state management
- **Vue Router for routing** — use Vue Router for navigation
- **Scoped styles** — use scoped styles to avoid CSS conflicts
- **Performance optimization** — use lazy loading and memoization
- **Testing** — test components with Vue Test Utils

## Focus areas

- 1. Core Stack
- 2. Component Structure
- 3. Reactivity System
- 4. Component Design
- 5. State Management
- 6. Routing
- 7. Performance Optimization
- 8. Forms
- 9. Styling
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
