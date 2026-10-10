---
name: "mikroorm-best-practices"
description: "Best practices for using MikroORM — the TypeScript ORM conventions for SQL and MongoDB. Use when writing, structuring, or reviewing MikroORM — covers entity definition, unit of work, identity map, relations, querying, migrations, performance, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "orm"
  - "mikro"
  - "mikroorm"
when_to_use: "Use when writing, structuring, or reviewing MikroORM."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../type-orm/SKILL.md"
  - "../sequelize/SKILL.md"
  - "../drizzle/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# MikroORM Best Practices

MikroORM is a TypeScript data-mapper ORM with a **unit of work**: entities are plain objects, and em.flush() persists every tracked change in one transaction. Practical MikroORM leans on **a single MikroORM/EntityManager per request, em.fork() for isolated contexts, entities as the schema (decorators or schema-first), and explicit populate over lazy ref access**. The magic is real but bounded — understand what managed vs detached means and the ORM stays predictable.

## When to use

Use when writing, structuring, or reviewing MikroORM.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **One em per unit of work; fork for isolation, never share across calls.**
- **Entities are schema + type; numeric money; no floats.**
- **populate eagerly; projections for reads; filters are known, not incidental.**
- **UoW flushes once; transactional for multi-entity invariants; @Version for races.**
- **Migrations reviewed, one per change, never synchronize in prod.**
- **Debug/EXPLAIN before optimizing; the DB boundary owns read cost.**
- [ ] One MikroORM init; em.fork() per request/worker; synchronize: false
- [ ] Decorator entities with tight columnTypes (numeric, varchar(n), @Enum)

## Focus areas

- 1. ORM Setup & Context
- 2. Entities
- 3. Identity Map & Unit of Work
- 4. Querying & Relations
- 5. Migrations & Schema
- 6. Transactions & Concurrency
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
