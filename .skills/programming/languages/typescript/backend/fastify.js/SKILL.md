---
name: "fastify-backend"
description: "Best practices for building HTTP APIs and web services with Fastify (Node.js/TypeScript). Use when creating, structuring, or reviewing a Fastify app — covers plugin architecture, schema validation, hooks, encapsulation, error handling, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "backend"
  - "fastify"
  - "js"
when_to_use: "Use when creating, structuring, or reviewing a Fastify app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../express.js/SKILL.md"
  - "../koa.js/SKILL.md"
  - "../hapi.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Fastify.js Backend Best Practices

Fastify is the high-performance, plugin-architecture Node.js web framework: schema-first validation, Promise-based lifecycle, and a composition model where capabilities are registered plugins. It's the natural upgrade from Express when you want enforceability (typed schemas, encapsulated state, timing/logging out of the box) without surrendering control. Best practice here is about leaning into plugins, schemas, and hooks — the three features that make a Fastify app coherent.

## When to use

Use when creating, structuring, or reviewing a Fastify app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Register, don't sprinkle** — capabilities are plugins; app is a tree of registers with prefix scoping
- **Schema once, used everywhere** — validation + serialization + types + docs all from one declaration; the compiler and the wire agree
- **Hooks over scattered middleware** — lifecycle is explicit (onRequest → preValidation → preHandler → onSend → onResponse); keep order deterministic
- **One error handler, one logger** — centralization is where observability lives
- **Fastify expects its own ergonomics** — don't race to express-style freedom; the enforcement is the point
- [ ] Capabilities as fastify-plugins with clear name; routes prefixed in their plugin
- [ ] Route schema (TypeBox/zod) set for body **and** response; one type provider chosen
- [ ] preValidation/preHandler hooks scoped per-plugin; generic concerns app-level

## Focus areas

- 1. Core Stack
- 2. Plugin Architecture (Encapsulation)
- 3. Schema Validation (The Fastify Way)
- 4. Hooks (Lifecycle)
- 5. Error Handling
- 6. Performance & Concurrency Discipline
- 7. Security
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
