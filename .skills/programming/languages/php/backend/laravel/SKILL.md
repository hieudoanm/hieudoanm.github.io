---
name: "laravel-backend"
description: "Best practices for building web applications and APIs with Laravel (PHP). Use when creating, structuring, or reviewing a Laravel app — covers layering, Eloquent discipline, validation, queues, service container, and testing."
tags:
  - "programming"
  - "language"
  - "php"
  - "backend"
  - "laravel"
when_to_use: "Use when creating, structuring, or reviewing a Laravel app."
prerequisites:
  - "Basic familiarity with Php and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../ruby/backend/rails/SKILL.md"
  - "../../../typescript/backend/express.js/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Laravel Backend Best Practices

Laravel is a modern PHP framework built on the service container, Eloquent ORM, and a rich set of conventions (routing, middleware, queues, events, policies). Best practice is treating Laravel as **an application framework, not the domain**: thin controllers, Form Request validation, Action/Service classes for business logic, Eloquent used deliberately, queues for non-blocking work, and domain logic kept framework-agnostic where possible.

## When to use

Use when creating, structuring, or reviewing a Laravel app.

## Prerequisites

- Basic familiarity with Php and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Laravel is the framework, services are the domain** — Actions/Services carry workflows; models carry data + invariants; controllers stay thin
- **Form Requests own validation**; **policies own authorization** — Laravel's declarative edge
- **Eloquent deliberately** — casts, eager loading against N+1, transactions for writes, enums for state
- **Queues for async, not the web process** — non-blocking by default
- **Test behavior, not framework plumbing** — feature + unit pyramid, deterministic
- [ ] Laravel 10+/PHP 8.2+ pinned; conventions-first layout
- [ ] Thin controllers → Form Requests (validation) → Action/Service classes → respond
- [ ] Eloquent used deliberately: $casts, eager loading against N+1, explicit DB::transaction

## Focus areas

- 1. Core Stack & Constraints
- 2. MVC & Layering
- 3. Eloquent Discipline
- 4. Validation
- 5. Service Container & DI
- 6. Queues, Jobs & Events
- 7. Policies & Authorization
- 8. Performance, Memory & Safety
- 9. Reliability, Testing & Portability
- 10. Security

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
