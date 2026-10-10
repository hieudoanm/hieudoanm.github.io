# Hono.js Backend Best Practices: Decision Record

Use this record when applying [Hono.js Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs and edge-capable web services with Hono (TypeScript). Use when creating, structuring, or reviewing a Hono app — covers middleware, typed routes, validation, adapters, error handling, and testing across server runtimes.

Hono is a small, standards-based TypeScript web framework that runs anywhere fetch/Request/Response do: Node, Bun, Deno, Cloudflare Workers, and browsers via adapters. Handlers get a Request-shaped c.req and return Responses, middleware is a flat app.use + await next() model, and types flow through route chains. Best practice here is about respecting the Web-standard shape (it's why the same code ports everywhere), using middleware as small app.use layers, and leaning on Hono's typed helpers instead of stringly routing.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Runtime Choice
- [ ] 2. App & Route Structure
- [ ] 3. Middleware (app.use)
- [ ] 4. Validation & Typed Input
- [ ] 5. Error Handling & Lifecycle
- [ ] 6. Adapters, Streaming & the Web Standard
- [ ] 7. Performance & Edge Discipline
- [ ] 8. Testing

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
