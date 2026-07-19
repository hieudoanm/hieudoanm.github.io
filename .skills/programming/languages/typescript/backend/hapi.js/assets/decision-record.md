# Hapi.js Backend Best Practices: Decision Record

Use this record when applying [Hapi.js Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs and web services with hapi (Node.js/TypeScript). Use when creating, structuring, or reviewing a hapi app — covers plugin registration, route config, Joi validation, Boom errors, lifecycle extensions, caching, and testing.

hapi is a configuration-driven Node.js framework built on plugins and a rich request lifecycle: you _describe_ servers, routes, validation, auth, and cache in config objects, and hapi enforces them. Its strengths — explicit lifecycle hooks, Joi validation, Boom errors, built-in caching — shine in large, stable APIs. Note hapi is in maintenance mode on the npm hapi/@hapi/hapi line, so prefer it for legacy consistency; reach for Fastify unless this architecture pattern is already proven in the codebase.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. Server Construction & Plugins
- [ ] 3. Routes (Config Objects)
- [ ] 4. Validation (Joi)
- [ ] 5. Errors (Boom)
- [ ] 6. Lifecycle Hooks (server.ext)
- [ ] 7. Caching
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
