# Actix-web Best Practices

Actix-web is a high-performance, actor-based Rust web framework built on tokio. Practical Actix-web leans on **App composition with route/web::scope, web::Json/web::Path/web::Query extractors at the handler boundary, a single State (or Data) passed via App::app_data**, and **actix_web::Result/error mapping through From-conversions to HTTP responses**. Safety comes from Rust's type system; discipline keeps it ergonomic.

## When to use

Use when writing, structuring, or reviewing Actix-web.

## Core topics

- 1. App & Routing
- 2. Extractors & Handlers
- 3. State & Dependencies
- 4. Error Handling
- 5. Middleware
- 6. Data & Async

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Actix-web Best Practices: Basic Usage](./examples/basic-usage.md)
- [Actix-web Best Practices: 4. Error Handling](./examples/reliability-and-edge-cases.md)
- [Actix-web Best Practices: 2. Extractors & Handlers](./examples/setup-and-configuration.md)
- [Actix-web Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [Actix-web Best Practices: Decision Record](./assets/decision-record.md)
- [Actix-web Best Practices: Starter Template](./assets/starter-template.md)
- [Actix-web Best Practices: Validation Plan](./assets/validation-plan.md)
- [Actix-web Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
