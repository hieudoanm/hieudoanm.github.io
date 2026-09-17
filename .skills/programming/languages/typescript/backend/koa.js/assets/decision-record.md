# Koa.js Backend Best Practices: Decision Record

Use this record when applying [Koa.js Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs and web services with Koa (Node.js/TypeScript). Use when creating, structuring, or reviewing a Koa app — covers the context model, onion middleware, routing, validation, error handling, and testing.

Koa (by the Express authors) replaces the req/res pair with a single request **ctx** and composes behaviour through _onion_ middleware: each layer await next()s into the next and resumes outward. Koa is deliberately bare — there's no router, body parser, or security middleware built in — so best practice is about assembling a disciplined middleware stack, keeping ctx access central, and choosing well-maintained companions (@koa/router, koa-bodyparser, koa-helmet).

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. The Context Model
- [ ] 3. Onion Middleware (The Core Idea)
- [ ] 4. Routing
- [ ] 5. Validation & Input Handling
- [ ] 6. Error Handling
- [ ] 7. Async Discipline & Security
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
