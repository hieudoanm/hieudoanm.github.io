# Laravel Backend Best Practices: Decision Record

Use this record when applying [Laravel Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building web applications and APIs with Laravel (PHP). Use when creating, structuring, or reviewing a Laravel app — covers layering, Eloquent discipline, validation, queues, service container, and testing.

Laravel is a modern PHP framework built on the service container, Eloquent ORM, and a rich set of conventions (routing, middleware, queues, events, policies). Best practice is treating Laravel as **an application framework, not the domain**: thin controllers, Form Request validation, Action/Service classes for business logic, Eloquent used deliberately, queues for non-blocking work, and domain logic kept framework-agnostic where possible.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Php and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. MVC & Layering
- [ ] 3. Eloquent Discipline
- [ ] 4. Validation
- [ ] 5. Service Container & DI
- [ ] 6. Queues, Jobs & Events
- [ ] 7. Policies & Authorization
- [ ] 8. Performance, Memory & Safety

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
