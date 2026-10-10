# Echo Best Practices

Echo is a high-performance Go web framework with a rich ecosystem of middleware and an elegant **handler signature** func(c echo.Context) error that centralizes request/response handling. Practical Echo leans on **route groups with layered middleware, one handler per request concern, a Context-owned request boundary that flows cancellation downstream**, and **errors returned, not thrown, with a uniform error handler**.

## When to use

Use when writing, structuring, or reviewing Echo.

## Core topics

- 1. Route Grouping
- 2. Middleware
- 3. Handlers
- 4. Context & Binding
- 5. Error Handling
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Echo Best Practices: Basic Usage](./examples/basic-usage.md)
- [Echo Best Practices: 5. Error Handling](./examples/reliability-and-edge-cases.md)
- [Echo Best Practices: 2. Middleware](./examples/setup-and-configuration.md)
- [Echo Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Echo Best Practices: Decision Record](./assets/decision-record.md)
- [Echo Best Practices: Starter Template](./assets/starter-template.md)
- [Echo Best Practices: Validation Plan](./assets/validation-plan.md)
- [Echo Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
