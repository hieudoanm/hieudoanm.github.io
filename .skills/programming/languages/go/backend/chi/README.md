# Chi Best Practices

Chi is a lightweight Go router that composes like net/http — **route groups (chi.NewRouter) with middleware, handlers returning http.Handler, and chi.URLParam for parameter extraction**. Practical Chi leans on **small, composable middleware, handlers that own one request concern, context-carried request IDs and scoped values**, and **errors as values (not panics) flowing to a uniform error handler**.

## When to use

Use when writing, structuring, or reviewing Chi services.

## Core topics

- 1. Router & Route Composition
- 2. Middleware
- 3. Handlers
- 4. Context & Request State
- 5. Errors & Responses
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Chi Best Practices: Basic Usage](./examples/basic-usage.md)
- [Chi Best Practices: 5. Errors & Responses](./examples/reliability-and-edge-cases.md)
- [Chi Best Practices: 1. Router & Route Composition](./examples/setup-and-configuration.md)
- [Chi Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Chi Best Practices: Decision Record](./assets/decision-record.md)
- [Chi Best Practices: Starter Template](./assets/starter-template.md)
- [Chi Best Practices: Validation Plan](./assets/validation-plan.md)
- [Chi Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
