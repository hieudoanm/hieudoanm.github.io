---
name: "hono-backend"
description: "Best practices for building HTTP APIs and edge-capable web services with Hono (TypeScript). Use when creating, structuring, or reviewing a Hono app — covers middleware, typed routes, validation, adapters, error handling, and testing across server runtimes."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "backend"
  - "hono"
  - "js"
when_to_use: "Use when creating, structuring, or reviewing a Hono app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../express.js/SKILL.md"
  - "../koa.js/SKILL.md"
  - "../fastify.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Hono.js Backend Best Practices

Hono is a small, standards-based TypeScript web framework that runs anywhere fetch/Request/Response do: Node, Bun, Deno, Cloudflare Workers, and browsers via adapters. Handlers get a Request-shaped c.req and return Responses, middleware is a flat app.use + await next() model, and types flow through route chains. Best practice here is about respecting the Web-standard shape (it's why the same code ports everywhere), using middleware as small app.use layers, and leaning on Hono's typed helpers instead of stringly routing.

## When to use

Use when creating, structuring, or reviewing a Hono app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Web-standards-first** — Request/Response/streams are the vocabulary; code written against them ports with zero rewrites
- **One error shape, one 404 shape** — onError/notFound are your consistency wins
- **Middleware as small, scoped layers** — path-pattern app.use, deterministic order, always await next() or return a response
- **Validate with zod once, type everywhere** — zValidator → c.req.valid() keeps the fast path honest
- **Adapters are deployment decisions** — share the app, choose the serve story per environment
- [ ] Handlers return Responses (c.json/c.text/c.body(...)) — no res mutation
- [ ] Routers nested via app.route("/api/v1", ...); app exported for adapters/tests
- [ ] Middleware app.use path-scoped, one concern, await next() discipline

## Focus areas

- 1. Core Stack & Runtime Choice
- 2. App & Route Structure
- 3. Middleware (app.use)
- 4. Validation & Typed Input
- 5. Error Handling & Lifecycle
- 6. Adapters, Streaming & the Web Standard
- 7. Performance & Edge Discipline
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
