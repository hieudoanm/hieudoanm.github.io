---
name: "koa-backend"
description: "Best practices for building HTTP APIs and web services with Koa (Node.js/TypeScript). Use when creating, structuring, or reviewing a Koa app — covers the context model, onion middleware, routing, validation, error handling, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "backend"
  - "koa"
  - "js"
when_to_use: "Use when creating, structuring, or reviewing a Koa app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../express.js/SKILL.md"
  - "../fastify.js/SKILL.md"
  - "../hono.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Koa.js Backend Best Practices

Koa (by the Express authors) replaces the req/res pair with a single request **ctx** and composes behaviour through _onion_ middleware: each layer await next()s into the next and resumes outward. Koa is deliberately bare — there's no router, body parser, or security middleware built in — so best practice is about assembling a disciplined middleware stack, keeping ctx access central, and choosing well-maintained companions (@koa/router, koa-bodyparser, koa-helmet).

## When to use

Use when creating, structuring, or reviewing a Koa app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Compose from small, named middleware** — the onion model rewards layers that each do one thing and await next() correctly
- **The error path is one place** — a single wrapper mapping exceptions → status; everything that throws flows through it
- **Assemble what Express/Fastify build in** — Koa has no opinions; decide router/parser/security once and standardize (that's the real work)
- **Choose consciously for fit** — Koa's advantage is minimalism; if you want features built in, Fastify's plugin/schema model is the ergonomic sibling (see backend/fastify.js.md)
- [ ] ctx-only handlers; ctx.body/ctx.status always assigned for non-200s
- [ ] Onion middleware composed: security → logging/request-id → bodyparser(limit) → routes → error
- [ ] Every middleware either await next()s or ends the response deliberately
- [ ] @koa/router prefixes per resource; allowedMethods() for 405s

## Focus areas

- 1. Core Stack
- 2. The Context Model
- 3. Onion Middleware (The Core Idea)
- 4. Routing
- 5. Validation & Input Handling
- 6. Error Handling
- 7. Async Discipline & Security
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
