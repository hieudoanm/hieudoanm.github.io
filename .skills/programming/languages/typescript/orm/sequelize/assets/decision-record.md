# Sequelize Best Practices: Decision Record

Use this record when applying [Sequelize Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using Sequelize — the Node.js ORM conventions for SQL databases. Use when writing, structuring, or reviewing Sequelize — covers models, associations, queries, validations, migrations, transactions, performance, and testing.

Sequelize is the classic Node.js ORM for SQL databases — **models** defined as Model subclasses with explicit attribute types, **associations** (hasMany/belongsTo) that generate columns and eager-loading, and a **promise-based API** whose .findAll({ where, include }) reads as the query. Practical Sequelize leans on **typed models with explicit table names + underscored discipline, explicit include/attributes over magic eager-loading, and migrations (sequelize-cli) as the only schema path**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Models & Definitions
- [ ] 2. Associations
- [ ] 3. Querying & Projection
- [ ] 4. Validations & Hooks
- [ ] 5. Transactions
- [ ] 6. Migrations
- [ ] 7. Performance
- [ ] 8. Testing

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
