# Chi Best Practices: Decision Record

Use this record when applying [Chi Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Go web services with Chi — the lightweight, composable HTTP router conventions. Use when writing, structuring, or reviewing Chi services — covers routing, middleware, handlers, context, validation, errors, testing, and deployment.

Chi is a lightweight Go router that composes like net/http — **route groups (chi.NewRouter) with middleware, handlers returning http.Handler, and chi.URLParam for parameter extraction**. Practical Chi leans on **small, composable middleware, handlers that own one request concern, context-carried request IDs and scoped values**, and **errors as values (not panics) flowing to a uniform error handler**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Router & Route Composition
- [ ] 2. Middleware
- [ ] 3. Handlers
- [ ] 4. Context & Request State
- [ ] 5. Errors & Responses
- [ ] 6. Testing
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

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
