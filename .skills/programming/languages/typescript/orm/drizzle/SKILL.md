---
name: "drizzle-orm-design"
description: "Best practices for building database layers with Drizzle ORM (TypeScript). Use when creating, structuring, or reviewing a Drizzle schema, migrations, or queries — covers schema/relations, drizzle-kit workflow, relational queries, raw SQL, transactions, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "orm"
  - "drizzle"
  - "design"
when_to_use: "Use when creating, structuring, or reviewing a Drizzle schema, migrations, or queries."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../prisma/SKILL.md"
  - "../sequelize/SKILL.md"
  - "../mikro-orm/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Drizzle ORM Best Practices

Drizzle is a "headless" TypeScript ORM: schema is _code_ (drizzle.ts), the client is lightweight, and it stays close to SQL — type-safety without hiding the query. Best practice here is about treating the schema module as the single source of truth, using drizzle-kit for migrations, and knowing when the SQL-adjacent power (tagged sql\\``, relational queries, prepared statements) should be used instead of emulating a framework ORM.

## When to use

Use when creating, structuring, or reviewing a Drizzle schema, migrations, or queries.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Schema-as-code discipline** — the TS module _is_ the schema; migrate from it, never scissors-edit the DB directly
- **Choose based on the query shape** — relational queries for nested reads, select builder for flat lists, sql\\`` for anything SQL-shaped; don't force one style
- **Stay close to the DB** — Drizzle earns its value when you let the SQL show; if you want a framework hiding SQL, pick Prisma; if you want SQL with safety rails, Drizzle + tagged sql is the sweet spot
- **Repository boundaries** — keep schema.ts + queries behind a data module so models don't cross layers untranslated; map driver errors at this seam
- **Prepared statements and indexes on hot paths** — Drizzle gives you the control, so use it where it counts (see §4–5)
- [ ] Schema as a typed module (pg-core/mysql-core/sqlite-core/d1), $inferSelect/$inferInsert types exported
- [ ] Relations declared bidirectionally for db.query relational reads
- [ ] FKs with onDelete behaviour in the schema

## Focus areas

- 1. Setup & Schema as Code
- 2. Relations & Type Safety
- 3. Drizzle-Kit Workflow (Migrations)
- 4. Querying
- 5. Prepared Statements & Performance
- 6. Transactions & Batchs
- 7. Errors & Edge Cases
- 8. Seeding & Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
