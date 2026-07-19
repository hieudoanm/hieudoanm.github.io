---
name: "sequelize-best-practices"
description: "Best practices for using Sequelize — the Node.js ORM conventions for SQL databases. Use when writing, structuring, or reviewing Sequelize — covers models, associations, queries, validations, migrations, transactions, performance, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "orm"
  - "sequelize"
when_to_use: "Use when writing, structuring, or reviewing Sequelize."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../mongoose/SKILL.md"
  - "../mikro-orm/SKILL.md"
  - "../type-orm/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Sequelize Best Practices

Sequelize is the classic Node.js ORM for SQL databases — **models** defined as Model subclasses with explicit attribute types, **associations** (hasMany/belongsTo) that generate columns and eager-loading, and a **promise-based API** whose .findAll({ where, include }) reads as the query. Practical Sequelize leans on **typed models with explicit table names + underscored discipline, explicit include/attributes over magic eager-loading, and migrations (sequelize-cli) as the only schema path**.

## When to use

Use when writing, structuring, or reviewing Sequelize.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Models initged with underscored, tableName, tight DataTypes — the schema is in the model.**
- **Associations declared both sides; include eagerly; project via attributes.**
- **Validation at the model; hooks small; Op.* for operators, never string SQL assembly.**
- **transaction() everywhere or nowhere in the callback.**
- **Migrations reviewed, one per change, never sync() in prod.**
- **EXPLAIN before you optimize; the DB boundary is where read cost lives.**
- [ ] Model.init with tableName + underscored; DECIMAL money; STRING(n) bounded
- [ ] Associations on both sides with explicit foreignKey; aliased as: when needed

## Focus areas

- 1. Models & Definitions
- 2. Associations
- 3. Querying & Projection
- 4. Validations & Hooks
- 5. Transactions
- 6. Migrations
- 7. Performance
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
