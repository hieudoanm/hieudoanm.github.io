# Echo Best Practices: Decision Record

Use this record when applying [Echo Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Go web services with Echo — the high-performance HTTP framework conventions. Use when writing, structuring, or reviewing Echo — covers routing, middleware, handlers, context, validation, errors, testing, and deployment.

Echo is a high-performance Go web framework with a rich ecosystem of middleware and an elegant **handler signature** func(c echo.Context) error that centralizes request/response handling. Practical Echo leans on **route groups with layered middleware, one handler per request concern, a Context-owned request boundary that flows cancellation downstream**, and **errors returned, not thrown, with a uniform error handler**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Go and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Route Grouping
- [ ] 2. Middleware
- [ ] 3. Handlers
- [ ] 4. Context & Binding
- [ ] 5. Error Handling
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
