---
name: "nextjs-best-practices"
description: "Best practices for building web applications with Next.js (React framework). Use when creating, structuring, or reviewing a Next.js app — covers routing, data fetching, SSR/SSG, API routes, optimization, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "next"
  - "nextjs"
when_to_use: "Use when creating, structuring, or reviewing a Next.js app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../astro/SKILL.md"
  - "../solid-start/SKILL.md"
  - "../react/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Next.js Best Practices

Next.js is a React framework that provides server-side rendering, static site generation, and hybrid rendering capabilities. Best practice is to leverage Next.js's built-in optimizations while maintaining clean component architecture, proper data fetching patterns, and performance-first thinking.

## When to use

Use when creating, structuring, or reviewing a Next.js app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Server Components by default** — only use Client Components when necessary
- **Fetch data in Server Components** — avoid useEffect for data fetching
- **Use App Router for new projects** — better performance and developer experience
- **Optimize images and fonts** — use Next.js built-in optimization
- **Proper error boundaries** — handle errors gracefully
- **TypeScript strict mode** — catch type errors early
- **ESLint and Prettier** — maintain code quality
- [ ] App Router structure with app/ directory

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Routing & Navigation
- 4. Data Fetching
- 5. Server vs Client Components
- 6. Styling
- 7. Optimization
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
