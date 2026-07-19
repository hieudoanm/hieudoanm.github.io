---
name: "react-best-practices"
description: "Best practices for building React applications. Use when creating, structuring, or reviewing React code — covers components, hooks, state management, performance, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "react"
when_to_use: "Use when creating, structuring, or reviewing React code."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../vue/SKILL.md"
  - "../angular/SKILL.md"
  - "../nuxt/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# React Best Practices

React is a JavaScript library for building user interfaces. Best practice is to think in components, use hooks effectively, manage state properly, and optimize performance with React's built-in mechanisms.

## When to use

Use when creating, structuring, or reviewing React code.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Functional components with hooks** — prefer over class components
- **Custom hooks for reusable logic** — extract repeated patterns
- **TypeScript for type safety** — catch errors at compile time
- **Performance optimization** — memoize when necessary
- **Test your components** — ensure they work as expected
- **Keep components small** — single responsibility principle
- [ ] Functional components with TypeScript
- [ ] Custom hooks for reusable logic

## Focus areas

- 1. Core Stack
- 2. Component Design
- 3. Hooks Best Practices
- 4. State Management
- 5. Performance Optimization
- 6. Forms
- 7. Styling
- 8. Error Handling
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
