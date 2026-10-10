---
name: "rails-backend"
description: "Best practices for building web applications and APIs with Ruby on Rails. Use when creating, structuring, or reviewing a Rails app — covers MVC boundaries, Active Record discipline, services, background jobs, performance, and testing."
tags:
  - "programming"
  - "language"
  - "ruby"
  - "backend"
  - "rails"
when_to_use: "Use when creating, structuring, or reviewing a Rails app."
prerequisites:
  - "Basic familiarity with Ruby and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../php/backend/laravel/SKILL.md"
  - "../../../typescript/backend/express.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Rails Backend Best Practices

Rails is a mature, convention-heavy application framework: convention over configuration, MVC, Active Record, and integration-tested workflow primitives like jobs, mailers, and storage. Best practice is treating Rails as **an application framework, not the domain** — controllers orchestrate HTTP, models own persistence and invariants, services/Plain-Ruby-Objects own workflows, and domain logic would survive outside Rails if needed.

## When to use

Use when creating, structuring, or reviewing a Rails app.

## Prerequisites

- Basic familiarity with Ruby and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Rails is the framework; the domain lives in services/POROs** — a workflow should be readable and testable independent of the request cycle
- **Skinny controllers, invariant-owning models, service classes for flows** — the Rails sweet spot
- **Callbacks for persistence-coupling only** — side-effectful callbacks are a debugging trap; prefer explicit services
- **Measure before optimizing**; cache intentionally; know your N+1s
- **Test the behavior, not the Rails plumbing** — request tests, model invariants, PORO units
- [ ] Skinny controllers; models own persistence + invariants; POROs for workflows
- [ ] Service objects over fat models; policies over inline authorization
- [ ] Callback-light models (persistence-coupling only); concerns used sparingly

## Focus areas

- 1. Core Stack & Constraints
- 2. MVC Boundaries
- 3. Architecture & Design Rates
- 4. Organizing Beyond `app/models`
- 5. Active Record Discipline
- 6. Performance, Memory & Safety
- 7. Background Jobs & Async
- 8. Reliability, Testing & Portability
- 9. Security

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
