# Sequelize Best Practices

Sequelize is the classic Node.js ORM for SQL databases — **models** defined as Model subclasses with explicit attribute types, **associations** (hasMany/belongsTo) that generate columns and eager-loading, and a **promise-based API** whose .findAll({ where, include }) reads as the query. Practical Sequelize leans on **typed models with explicit table names + underscored discipline, explicit include/attributes over magic...

## When to use

Use when writing, structuring, or reviewing Sequelize.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Sequelize Best Practices: Basic Usage](./examples/basic-usage.md)
- [Sequelize Best Practices: 7. Performance](./examples/reliability-and-edge-cases.md)
- [Sequelize Best Practices: 1. Models & Definitions](./examples/setup-and-configuration.md)
- [Sequelize Best Practices: 8. Testing](./examples/testing-and-validation.md)

## Assets

- [Sequelize Best Practices: Decision Record](./assets/decision-record.md)
- [Sequelize Best Practices: Starter Template](./assets/starter-template.md)
- [Sequelize Best Practices: Validation Plan](./assets/validation-plan.md)
- [Sequelize Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
