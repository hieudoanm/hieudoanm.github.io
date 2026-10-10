# tRPC Best Practices

tRPC gives **end-to-end typed APIs** — the same Router types flow from server (@trpc/server) to client (@trpc/client) without codegen. Practical tRPC leans on **small routers per domain exposing sub routers, zod input/output schemas on every procedure, middleware for context/auth/rate-limit**, and **Context built at request time (never global)**. Type theory isn't the feature — the total package (types + validation +...

## When to use

Use when writing, structuring, or reviewing tRPC.

## Core topics

- 1. Router Structure
- 2. Procedures & Input Schemas
- 3. Context
- 4. Middleware & Authorization
- 5. Error Handling
- 6. Client Integration

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [tRPC Best Practices: Basic Usage](./examples/basic-usage.md)
- [tRPC Best Practices: 5. Error Handling](./examples/reliability-and-edge-cases.md)
- [tRPC Best Practices: 2. Procedures & Input Schemas](./examples/setup-and-configuration.md)
- [tRPC Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [tRPC Best Practices: Decision Record](./assets/decision-record.md)
- [tRPC Best Practices: Starter Template](./assets/starter-template.md)
- [tRPC Best Practices: Validation Plan](./assets/validation-plan.md)
- [tRPC Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
