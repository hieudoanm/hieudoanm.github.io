# Gotham Best Practices

Gotham is a **type-safe, principled Rust web framework** — it threads State (an extensible request context) explicitly through handlers (receive_and_respond style) and is built on hyper. Practical Gotham leans on **router::builder::tree for typed routes, handler functions receiving State and returning responses, and explicit error types** converted at the boundary. Gotham's philosophy: fewer surprises, more compile-time...

## When to use

Use when writing, structuring, or reviewing Gotham.

## Core topics

- 1. Router & Bootstrapping
- 2. Handlers & State
- 3. Extractors
- 4. Error Handling
- 5. Async & Dependencies
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Gotham Best Practices: Basic Usage](./examples/basic-usage.md)
- [Gotham Best Practices: 4. Error Handling](./examples/reliability-and-edge-cases.md)
- [Gotham Best Practices: 2. Handlers & State](./examples/setup-and-configuration.md)
- [Gotham Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Gotham Best Practices: Decision Record](./assets/decision-record.md)
- [Gotham Best Practices: Starter Template](./assets/starter-template.md)
- [Gotham Best Practices: Validation Plan](./assets/validation-plan.md)
- [Gotham Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
