# TypeORM Best Practices

TypeORM is a TypeScript ORM for relational databases that models tables as **classes decorated with metadata** (@Entity, @Column). Practical TypeORM leans on **a single DataSource created once, entities that are both the schema and the type shape, explicit relation loading (relations:/FindOptions), and migrations as the only schema evolution path**. The Repository/EntityManager boundary keeps queries typed; the query...

## When to use

Use when writing, structuring, or reviewing TypeORM.

## Core topics

- 1. DataSource & Connection
- 2. Entities
- 3. Relations & Querying
- 4. Transactions
- 5. Migrations
- 6. Performance

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [TypeORM Best Practices: Basic Usage](./examples/basic-usage.md)
- [TypeORM Best Practices: 6. Performance](./examples/reliability-and-edge-cases.md)
- [TypeORM Best Practices: 2. Entities](./examples/setup-and-configuration.md)
- [TypeORM Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [TypeORM Best Practices: Decision Record](./assets/decision-record.md)
- [TypeORM Best Practices: Starter Template](./assets/starter-template.md)
- [TypeORM Best Practices: Validation Plan](./assets/validation-plan.md)
- [TypeORM Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
