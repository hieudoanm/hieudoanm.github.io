# Laravel Backend Best Practices

Laravel is a modern PHP framework built on the service container, Eloquent ORM, and a rich set of conventions (routing, middleware, queues, events, policies). Best practice is treating Laravel as **an application framework, not the domain**: thin controllers, Form Request validation, Action/Service classes for business logic, Eloquent used deliberately, queues for non-blocking work, and domain logic kept framework-agnostic...

## When to use

Use when creating, structuring, or reviewing a Laravel app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Laravel Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Laravel Backend Best Practices: 8. Performance, Memory & Safety](./examples/reliability-and-edge-cases.md)
- [Laravel Backend Best Practices: 2. MVC & Layering](./examples/setup-and-configuration.md)
- [Laravel Backend Best Practices: 9. Reliability, Testing & Portability](./examples/testing-and-validation.md)

## Assets

- [Laravel Backend Best Practices: Decision Record](./assets/decision-record.md)
- [Laravel Backend Best Practices: Starter Template](./assets/starter-template.md)
- [Laravel Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Laravel Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
