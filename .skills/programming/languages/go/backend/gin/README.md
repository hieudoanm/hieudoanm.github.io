# Gin Backend Best Practices

Gin is a fast, middleware-based HTTP framework for Go built on net/http. It keeps Go's explicitness (interfaces, context.Context, explicit errors) while adding routing, middleware, and JSON convenience. Best practice is standard-library-first: thin handlers, services own business logic, repositories own persistence, and business logic never appears in middleware.

## When to use

Use when creating, structuring, or reviewing a Gin app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Gin Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Gin Backend Best Practices: 8. Reliability & Maintainability](./examples/reliability-and-edge-cases.md)
- [Gin Backend Best Practices: 2. Project Structure & Routing](./examples/setup-and-configuration.md)
- [Gin Backend Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [Gin Backend Best Practices: Decision Record](./assets/decision-record.md)
- [Gin Backend Best Practices: Starter Template](./assets/starter-template.md)
- [Gin Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Gin Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
