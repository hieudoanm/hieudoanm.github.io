---
name: "gatsby-best-practices"
description: "Best practices for building static websites with Gatsby. Use when creating, structuring, or reviewing Gatsby applications — covers data sourcing, pages, components, performance, and deployment."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "gatsby"
when_to_use: "Use when creating, structuring, or reviewing Gatsby applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../astro/SKILL.md"
  - "../angular/SKILL.md"
  - "../nuxt/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Gatsby Best Practices

Gatsby is a React-based static site generator that pulls data from various sources. Best practice is to leverage Gatsby's data layer, optimize for performance, use GraphQL for data queries, and follow Gatsby's file system conventions.

## When to use

Use when creating, structuring, or reviewing Gatsby applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **GraphQL** — use GraphQL for data queries
- **File-based routing** — use file-based routing
- **Performance** — optimize images and code splitting
- **SEO** — optimize for search engines
- **Plugins** — leverage Gatsby's plugin ecosystem
- **Convention over configuration** — follow Gatsby's conventions
- [ ] Gatsby with TypeScript strict mode
- [ ] File-based routing in src/pages/

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Components
- 4. Pages
- 5. Data Sourcing
- 6. Styling
- 7. Performance
- 8. SEO
- 9. Hooks
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
