# Tornado Best Practices

Tornado is a **non-blocking, async Python web framework and server** — tornado.web with async def get/post handlers, native coroutine support, and the IOLoop at the center. Practical Tornado leans on **async handler methods only (no blocking calls on the loop), @gen.coroutine-era discipline now via native async/await, non-blocking HTTP clients (AsyncHTTPClient) for downstream calls, and explicit ioloop lifecycle** — one...

## When to use

Use when writing, structuring, or reviewing Tornado.

## Core topics

- 1. Handlers & Routing
- 2. Async Discipline
- 3. IOLoop & Lifecycle
- 4. Input/Output & Streaming
- 5. Static & WebSockets
- 6. Testing & Deployment

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Tornado Best Practices: Basic Usage](./examples/basic-usage.md)
- [Tornado Best Practices: 3. IOLoop & Lifecycle](./examples/reliability-and-edge-cases.md)
- [Tornado Best Practices: 2. Async Discipline](./examples/setup-and-configuration.md)
- [Tornado Best Practices: 6. Testing & Deployment](./examples/testing-and-validation.md)

## Assets

- [Tornado Best Practices: Decision Record](./assets/decision-record.md)
- [Tornado Best Practices: Starter Template](./assets/starter-template.md)
- [Tornado Best Practices: Validation Plan](./assets/validation-plan.md)
- [Tornado Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
