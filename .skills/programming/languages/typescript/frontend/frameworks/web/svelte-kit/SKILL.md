---
name: "sveltekit-best-practices"
description: "Best practices for building SvelteKit applications — server-first load functions, form actions, streaming, route groups, adapters, and the runes/SSR boundaries. Use when creating, structuring, or debugging a SvelteKit app."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "web"
  - "svelte"
  - "kit"
  - "sveltekit"
when_to_use: "Use when creating, structuring, or debugging a SvelteKit app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../next/SKILL.md"
  - "../nuxt/SKILL.md"
  - "../solid-start/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# SvelteKit

SvelteKit is the application framework for Svelte: it provides **file-based routing, server-side load functions, form actions, and progressive enhancement**, with a build step that splits server code from client code for you. Its defining trait is that a page is a **server component first and a client component second** — data loading, mutations, and rendering all default to the server. Practical SvelteKit work is about **choosing the narrowest privilege for each route, keeping server-only code out of the client bundle, and treating the no-JavaScript path as a real requirement**....

## When to use

Use when creating, structuring, or debugging a SvelteKit app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Privileged data in a universal +page.ts load,** which serialises it to the client
- **A +page.ts load that mutates,** producing an uncacheable, unbookmarkable state-changing GET
- **Re-fetching in a child page that should await parent().**
- **prerender = true on a dynamic route with no entries,** which yields an empty build
- **Assuming handle guards a prerendered page.**
- **Client-side-only validation,** which is a suggestion rather than a control
- **A root layout that loads everything,** making every navigation wait on every request
- **Hand-built absolute URLs,** which break under a BASE_PATH deployment

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Rendering & Data Loading
- 4. Mutations & Form Actions
- 5. Hooks & Middleware
- 6. Adapters & Deployment
- 7. Performance
- 8. Styling
- 9. SEO & Accessibility
- 10. Testing
- 11. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
