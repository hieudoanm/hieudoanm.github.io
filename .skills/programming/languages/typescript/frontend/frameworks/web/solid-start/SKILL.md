---
name: "solid-start-best-practices"
description: "Best practices for building full-stack applications with SolidStart (Solid.js meta-framework). Use when creating, structuring, or reviewing SolidStart applications — covers routing, data fetching, server-side rendering, and performance."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "solid"
  - "start"
when_to_use: "Use when creating, structuring, or reviewing SolidStart applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../nuxt/SKILL.md"
  - "../astro/SKILL.md"
  - "../next/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# SolidStart Best Practices

SolidStart is a full-stack framework built on Solid.js that provides server-side rendering, static site generation, and API routes. Best practice is to leverage Solid's reactivity, use server-side rendering for performance, follow SolidStart's conventions, and optimize for web performance.

## When to use

Use when creating, structuring, or reviewing SolidStart applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Fine-grained reactivity** — leverage Solid's reactivity
- **Signals for state** — use signals for reactive state
- **TypeScript** — use TypeScript for type safety
- **Server-side rendering** — leverage SSR for performance
- **File-based routing** — use file-based routing
- **API routes** — use API routes for backend logic
- [ ] SolidStart with TypeScript strict mode
- [ ] File-based routing in src/routes/

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Components
- 4. Routing
- 5. Data Fetching
- 6. Server-Side Rendering
- 7. API Routes
- 8. State Management
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
