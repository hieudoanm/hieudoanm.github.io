---
name: "astro-best-practices"
description: "Best practices for building content-driven websites with Astro. Use when creating, structuring, or reviewing Astro applications — covers components, routing, data fetching, optimization, and performance."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "astro"
when_to_use: "Use when creating, structuring, or reviewing Astro applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../gatsby/SKILL.md"
  - "../next/SKILL.md"
  - "../solid-start/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Astro Best Practices

Astro is a modern static site builder that delivers lightning-fast performance. Best practice is to leverage Astro's island architecture, use zero-JS by default, optimize for performance, and follow Astro's component patterns.

## When to use

Use when creating, structuring, or reviewing Astro applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Zero JavaScript by default** — only hydrate interactive components
- **Server-side rendering** — leverage Astro's server-side rendering
- **Performance first** — optimize for Core Web Vitals
- **Content collections** — use content collections for structured content
- **Framework integration** — use frameworks only when needed
- **SEO optimization** — optimize for search engines
- [ ] Astro with TypeScript strict mode
- [ ] File-based routing in src/pages/

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Astro Components
- 4. Routing
- 5. Data Fetching
- 6. Framework Integration
- 7. Performance
- 8. Styling
- 9. SEO
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
