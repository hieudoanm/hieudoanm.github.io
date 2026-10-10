---
name: "express-backend"
description: "Best practices for building HTTP APIs and web services with Express (Node.js/TypeScript). Use when creating, structuring, or reviewing an Express app — covers project layout, middleware, routing, validation, error handling, async discipline, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "backend"
  - "express"
  - "js"
when_to_use: "Use when creating, structuring, or reviewing an Express app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../koa.js/SKILL.md"
  - "../fastify.js/SKILL.md"
  - "../hono.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Express.js Backend Best Practices

Express is the minimal, battle-tested Node.js web framework: routing, middleware, and a tiny core, with everything else composed from the ecosystem. Best practice is about _structure and discipline_ — Express gives you almost no guardrails, so the value is in consistent project layout, middleware order, async-safe handlers, centralized error handling, and boundary validation.

## When to use

Use when creating, structuring, or reviewing an Express app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Express rewards structure, punishes improvisation** — layout, middleware order, and error paths decided once and consistently beat ad-hoc per-handler choices
- **Routes are thin translation layers** — params → validated/parsed → service → response; no business logic in handlers
- **Everything is typed at the boundary** — zod in, typed services out; req/res stay unknown until validated
- **One error path** — nothing throws outside the centralized middleware; never res.send(err) in handlers
- **Version the API early** (/api/v1/) — unversioned endpoints are expensive to change
- [ ] app.ts/server.ts split; routers per resource under /api/v1
- [ ] Middleware order: logging → body(limit) → security → request-id → routes → error
- [ ] Async handlers route errors to the error middleware (express@5 native, or asyncHandler)

## Focus areas

- 1. Core Stack
- 2. Project Layout
- 3. Middleware & Ordering
- 4. Routing & Handlers
- 5. Validation at the Boundary
- 6. Error Handling (Centralized)
- 7. Async Discipline & Concurrency
- 8. Security Essentials
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
