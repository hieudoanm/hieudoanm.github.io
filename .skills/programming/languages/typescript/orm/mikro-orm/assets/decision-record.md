# MikroORM Best Practices: Decision Record

Use this record when applying [MikroORM Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using MikroORM — the TypeScript ORM conventions for SQL and MongoDB. Use when writing, structuring, or reviewing MikroORM — covers entity definition, unit of work, identity map, relations, querying, migrations, performance, and testing.

MikroORM is a TypeScript data-mapper ORM with a **unit of work**: entities are plain objects, and em.flush() persists every tracked change in one transaction. Practical MikroORM leans on **a single MikroORM/EntityManager per request, em.fork() for isolated contexts, entities as the schema (decorators or schema-first), and explicit populate over lazy ref access**. The magic is real but bounded — understand what managed vs detached means and the ORM stays predictable.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. ORM Setup & Context
- [ ] 2. Entities
- [ ] 3. Identity Map & Unit of Work
- [ ] 4. Querying & Relations
- [ ] 5. Migrations & Schema
- [ ] 6. Transactions & Concurrency
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
