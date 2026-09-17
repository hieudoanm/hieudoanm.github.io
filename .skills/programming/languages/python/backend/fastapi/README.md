# FastAPI Backend Best Practices

FastAPI is an async-first, standards-based Python framework built on Starlette and Pydantic v2: type-annotated request/response models drive validation, serialization, generated OpenAPI docs, and dependency injection. Best practice here is about keeping route handlers thin, modelling every API boundary with Pydantic (never exposing ORM models), validating input declaratively, and keeping I/O-bound endpoints async without...

## When to use

Use when creating, structuring, or reviewing a FastAPI app.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [FastAPI Backend Best Practices: Basic Usage](./examples/basic-usage.md)
- [FastAPI Backend Best Practices: 7. Security & Validation](./examples/reliability-and-edge-cases.md)
- [FastAPI Backend Best Practices: 3. Pydantic Models at Every Boundary](./examples/setup-and-configuration.md)
- [FastAPI Backend Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [FastAPI Backend Best Practices: Decision Record](./assets/decision-record.md)
- [FastAPI Backend Best Practices: Starter Template](./assets/starter-template.md)
- [FastAPI Backend Best Practices: Validation Plan](./assets/validation-plan.md)
- [FastAPI Backend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
