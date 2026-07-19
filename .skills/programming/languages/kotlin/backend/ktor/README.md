# Ktor Backend Best Practices

Ktor is Kotlin-first, coroutine-native, asynchronous HTTP framework built around routing, a plugin (interceptor) pipeline, and serialization. Best practice here is coroutine-first design: suspend handlers and services, structured concurrency, non-blocking I/O everywhere, explicit plugin wiring, and strict layer separation so Ktor stays an edge layer rather than leaking into domain logic.

## When to use

Use when creating, structuring, or reviewing a Ktor app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Ktor Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Ktor Backend Best Practices: 6. Error Handling](./examples/reliability-and-edge-cases.md)
- [Ktor Backend Best Practices: 2. Application Setup & Plugins](./examples/setup-and-configuration.md)
- [Ktor Backend Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [Ktor Backend Best Practices: Decision Record](./assets/decision-record.md)
- [Ktor Backend Best Practices: Starter Template](./assets/starter-template.md)
- [Ktor Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Ktor Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
