---
name: "hapi-backend"
description: "Best practices for building HTTP APIs and web services with hapi (Node.js/TypeScript). Use when creating, structuring, or reviewing a hapi app — covers plugin registration, route config, Joi validation, Boom errors, lifecycle extensions, caching, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "backend"
  - "hapi"
  - "js"
when_to_use: "Use when creating, structuring, or reviewing a hapi app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../fastify.js/SKILL.md"
  - "../express.js/SKILL.md"
  - "../koa.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Hapi.js Backend Best Practices

hapi is a configuration-driven Node.js framework built on plugins and a rich request lifecycle: you _describe_ servers, routes, validation, auth, and cache in config objects, and hapi enforces them. Its strengths — explicit lifecycle hooks, Joi validation, Boom errors, built-in caching — shine in large, stable APIs. Note hapi is in maintenance mode on the npm hapi/@hapi/hapi line, so prefer it for legacy consistency; reach for Fastify unless this architecture pattern is already proven in the codebase.

## When to use

Use when creating, structuring, or reviewing a hapi app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Declare, don't improvise** — routes, validation, auth, and cache live in config; the handler is the small payoff at the end
- **Everything errors via Boom** — a single error vocabulary and one onPreResponse shape keep the API coherent
- **Plugins own their slice** — routes/hooks/methods grouped by capability, registered with prefixes; tests per plugin boundary
- **Maintenance reality check** — hapi is stable but legacy; pick it for proven codebases, and Fastify (this folder's fastify.js.md) when evaluating greenfield ergonomics
- [ ] Server config-first: port, global routes cors/validate options
- [ ] Routes as declarations with options.validate (Joi) + auth; handlers return h.response(...).code(...)
- [ ] failAction: "error" for validation; schemas colocated per route
- [ ] All errors thrown as Boom.*; domain→Boom mapped once

## Focus areas

- 1. Core Stack
- 2. Server Construction & Plugins
- 3. Routes (Config Objects)
- 4. Validation (Joi)
- 5. Errors (Boom)
- 6. Lifecycle Hooks (server.ext)
- 7. Caching
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
