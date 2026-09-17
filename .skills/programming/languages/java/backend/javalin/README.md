# Javalin Best Practices

Javalin is a lightweight, opinionated HTTP framework with a **handler signature Handler(ctx) on a single Context** — routing, params, JSON, WebSockets, and error handling all flow through one object. Practical Javalin leans on **app.get/post/route(...) builders, handler registration with use middleware layers, ctx.queryParam/pathParam/bodyAsClass typed access**, and **exceptionHandler mapping exceptions to responses**....

## When to use

Use when writing, structuring, or reviewing Javalin.

## Core topics

- 1. App Setup & Wiring
- 2. Handlers & Context
- 3. Middleware & Filters
- 4. Validation & Errors
- 5. Context & Request State
- 6. WebSockets (when needed)

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Javalin Best Practices: Basic Usage](./examples/basic-usage.md)
- [Javalin Best Practices: 4. Validation & Errors](./examples/reliability-and-edge-cases.md)
- [Javalin Best Practices: 1. App Setup & Wiring](./examples/setup-and-configuration.md)
- [Javalin Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [Javalin Best Practices: Decision Record](./assets/decision-record.md)
- [Javalin Best Practices: Starter Template](./assets/starter-template.md)
- [Javalin Best Practices: Validation Plan](./assets/validation-plan.md)
- [Javalin Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
