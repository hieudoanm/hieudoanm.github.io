# TypeORM Best Practices: Decision Record

Use this record when applying [TypeORM Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using TypeORM — the TypeScript ORM conventions for relational databases. Use when writing, structuring, or reviewing TypeORM — covers datasource config, entities, relations, querying, migrations, performance, and testing.

TypeORM is a TypeScript ORM for relational databases that models tables as **classes decorated with metadata** (@Entity, @Column). Practical TypeORM leans on **a single DataSource created once, entities that are both the schema and the type shape, explicit relation loading (relations:/FindOptions), and migrations as the only schema evolution path**. The Repository/EntityManager boundary keeps queries typed; the query builder is there for the genuinely dynamic cases.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. DataSource & Connection
- [ ] 2. Entities
- [ ] 3. Relations & Querying
- [ ] 4. Transactions
- [ ] 5. Migrations
- [ ] 6. Performance
- [ ] 7. Testing
- [ ] General Rules of Thumb

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
