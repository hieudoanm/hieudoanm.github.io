# Hono.js Backend Best Practices

Hono is a small, standards-based TypeScript web framework that runs anywhere fetch/Request/Response do: Node, Bun, Deno, Cloudflare Workers, and browsers via adapters. Handlers get a Request-shaped c.req and return Responses, middleware is a flat app.use + await next() model, and types flow through route chains. Best practice here is about respecting the Web-standard shape (it's why the same code ports everywhere), using...

## When to use

Use when creating, structuring, or reviewing a Hono app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Hono.js Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Hono.js Backend Best Practices: 5. Error Handling & Lifecycle](./examples/reliability-and-edge-cases.md)
- [Hono.js Backend Best Practices: 2. App & Route Structure](./examples/setup-and-configuration.md)
- [Hono.js Backend Best Practices: 8. Testing](./examples/testing-and-validation.md)

## Assets

- [Hono.js Backend Best Practices: Decision Record](./assets/decision-record.md)
- [Hono.js Backend Best Practices: Starter Template](./assets/starter-template.md)
- [Hono.js Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Hono.js Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
