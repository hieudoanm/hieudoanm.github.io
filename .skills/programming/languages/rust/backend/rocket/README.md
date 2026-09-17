# Rocket Best Practices

Rocket is a **macro-driven Rust web framework** where routes are #[get]/#[post]-attributed functions and **argument types are extractors (Request Guards, Query, Path)** defined by FromRequest. Practical Rocket leans on **typed route signatures, State for shared context, serde outcomes on Json<T>**, and **#[catch] handlers for uniform error responses**. Rocket prizes type-safety and developer ergonomics — your compile...

## When to use

Use when writing, structuring, or reviewing Rocket.

## Core topics

- 1. Launch Structure
- 2. Routes & Functions
- 3. Request Guards & State
- 4. JSON & Serialization
- 5. Errors & Logging
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Rocket Best Practices: Basic Usage](./examples/basic-usage.md)
- [Rocket Best Practices: 5. Errors & Logging](./examples/reliability-and-edge-cases.md)
- [Rocket Best Practices: 1. Launch Structure](./examples/setup-and-configuration.md)
- [Rocket Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Rocket Best Practices: Decision Record](./assets/decision-record.md)
- [Rocket Best Practices: Starter Template](./assets/starter-template.md)
- [Rocket Best Practices: Validation Plan](./assets/validation-plan.md)
- [Rocket Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
