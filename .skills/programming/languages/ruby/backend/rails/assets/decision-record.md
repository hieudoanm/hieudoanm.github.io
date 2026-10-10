# Rails Backend Best Practices: Decision Record

Use this record when applying [Rails Backend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building web applications and APIs with Ruby on Rails. Use when creating, structuring, or reviewing a Rails app — covers MVC boundaries, Active Record discipline, services, background jobs, performance, and testing.

Rails is a mature, convention-heavy application framework: convention over configuration, MVC, Active Record, and integration-tested workflow primitives like jobs, mailers, and storage. Best practice is treating Rails as **an application framework, not the domain** — controllers orchestrate HTTP, models own persistence and invariants, services/Plain-Ruby-Objects own workflows, and domain logic would survive outside Rails if needed.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Ruby and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. MVC Boundaries
- [ ] 3. Architecture & Design Rates
- [ ] 4. Organizing Beyond `app/models`
- [ ] 5. Active Record Discipline
- [ ] 6. Performance, Memory & Safety
- [ ] 7. Background Jobs & Async
- [ ] 8. Reliability, Testing & Portability

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
