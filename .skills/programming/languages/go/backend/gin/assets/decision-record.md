# Gin Backend Best Practices: Decision Record

Use this record when applying [Gin Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building HTTP APIs with Gin (Go). Use when creating, structuring, or reviewing a Gin app — covers routing, middleware, context, validation, error handling, and testing.

Gin is a fast, middleware-based HTTP framework for Go built on net/http. It keeps Go's explicitness (interfaces, context.Context, explicit errors) while adding routing, middleware, and JSON convenience. Best practice is standard-library-first: thin handlers, services own business logic, repositories own persistence, and business logic never appears in middleware.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. Project Structure & Routing
- [ ] 3. Handlers & Middleware
- [ ] 4. Middleware Patterns
- [ ] 5. Validation
- [ ] 6. Error Handling
- [ ] 7. Security
- [ ] 8. Reliability & Maintainability

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
