---
name: "angular-best-practices"
description: "Best practices for building web applications with Angular. Use when creating, structuring, or reviewing Angular applications — covers components, services, dependency injection, routing, state management, and performance."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "angular"
when_to_use: "Use when creating, structuring, or reviewing Angular applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../nuxt/SKILL.md"
  - "../react/SKILL.md"
  - "../vue/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Angular Best Practices

Angular is a platform for building web applications. Best practice is to follow Angular's architecture patterns, use dependency injection properly, implement efficient change detection, and maintain clear separation of concerns.

## When to use

Use when creating, structuring, or reviewing Angular applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Single Responsibility** — each component/service should have one clear purpose
- **Dependency Injection** — use constructor injection
- **Reactive programming** — use RxJS for async operations
- **OnPush change detection** — use OnPush for better performance
- **Lazy loading** — lazy load feature modules
- **TypeScript** — use TypeScript strict mode
- **Testing** — write comprehensive tests
- [ ] Angular CLI with strict mode enabled

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Components
- 4. Services & Dependency Injection
- 5. RxJS & Reactive Programming
- 6. Routing
- 7. Forms
- 8. State Management
- 9. Performance
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
