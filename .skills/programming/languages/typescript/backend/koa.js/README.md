# Koa.js Backend Best Practices

Koa (by the Express authors) replaces the req/res pair with a single request **ctx** and composes behaviour through _onion_ middleware: each layer await next()s into the next and resumes outward. Koa is deliberately bare — there's no router, body parser, or security middleware built in — so best practice is about assembling a disciplined middleware stack, keeping ctx access central, and choosing well-maintained companions...

## When to use

Use when creating, structuring, or reviewing a Koa app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Koa.js Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Koa.js Backend Best Practices: 6. Error Handling](./examples/reliability-and-edge-cases.md)
- [Koa.js Backend Best Practices: 2. The Context Model](./examples/setup-and-configuration.md)
- [Koa.js Backend Best Practices: 8. Testing](./examples/testing-and-validation.md)

## Assets

- [Koa.js Backend Best Practices: Decision Record](./assets/decision-record.md)
- [Koa.js Backend Best Practices: Starter Template](./assets/starter-template.md)
- [Koa.js Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Koa.js Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
