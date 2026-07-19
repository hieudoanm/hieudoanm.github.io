# SQLAlchemy Best Practices

SQLAlchemy is Python's relational toolkit: a **Core** (SQL expression language) and an **ORM** on top. Practical SQLAlchemy leans on **short-lived sessions with a transaction boundary (Session/sessionmaker + context manager), typed models with explicit relationships, and explicit queries (select()) over magic strings**. It wraps SQL rather than hiding it — a query you can't explain in SQL is a query you shouldn't ship with...

## When to use

Use when writing, structuring, or reviewing SQLAlchemy.

## Core topics

- 1. Engine & Session Lifecycle
- 2. Model Design
- 3. Querying
- 4. Migrations & Schema Evolution
- 5. Performance
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [SQLAlchemy Best Practices: Basic Usage](./examples/basic-usage.md)
- [SQLAlchemy Best Practices: 5. Performance](./examples/reliability-and-edge-cases.md)
- [SQLAlchemy Best Practices: 2. Model Design](./examples/setup-and-configuration.md)
- [SQLAlchemy Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [SQLAlchemy Best Practices: Decision Record](./assets/decision-record.md)
- [SQLAlchemy Best Practices: Starter Template](./assets/starter-template.md)
- [SQLAlchemy Best Practices: Validation Plan](./assets/validation-plan.md)
- [SQLAlchemy Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
