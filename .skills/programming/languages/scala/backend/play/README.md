# Play Framework Backend Best Practices

Play Framework is an async-first Scala web framework built on Akka (classic Akka HTTP engine) with type-safe routing, built-in JSON support, and constructor-based dependency injection. Best practice is async-first design: Future-returning controllers, never blocking the default execution context, constructor-based DI (no globals), DTOs at API boundaries, and explicit failure modeling.

## When to use

Use when creating, structuring, or reviewing a Play app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Play Framework Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Play Framework Backend Best Practices: 6. Error Handling](./examples/reliability-and-edge-cases.md)
- [Play Framework Backend Best Practices: 7. Configuration & Portability](./examples/setup-and-configuration.md)
- [Play Framework Backend Best Practices: 10. Testing](./examples/testing-and-validation.md)

## Assets

- [Play Framework Backend Best Practices: Decision Record](./assets/decision-record.md)
- [Play Framework Backend Best Practices: Starter Template](./assets/starter-template.md)
- [Play Framework Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Play Framework Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
