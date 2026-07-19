---
name: "prisma-orm-design"
description: "Best practices for building database layers with Prisma (TypeScript). Use when creating, structuring, or reviewing a Prisma schema, migrations, or client queries — covers schema design, relations, migration workflow, querying, performance, transactions, and seeding."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "orm"
  - "prisma"
  - "design"
when_to_use: "Use when creating, structuring, or reviewing a Prisma schema, migrations, or client queries."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../drizzle/SKILL.md"
  - "../mikro-orm/SKILL.md"
  - "../sequelize/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Prisma ORM Best Practices

Prisma turns your database schema into a typed query client: the schema.prisma is the single source of truth, and the generated client gives you type-safe CRUD and relations for free. Best practice here is about keeping that schema the _only_ place the data shape lives (generating, never hand-writing clients), modeling relations deliberately, and avoiding the classic foot-guns — N+1 queries, missing select, un-indexed filters, and fat transactions.

## When to use

Use when creating, structuring, or reviewing a Prisma schema, migrations, or client queries.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Schema-first discipline** — edit schema.prisma, generate, then code; never drift between an edited DB and an un-generated client
- **Typed queries over string SQL** wherever the client covers the shape — $queryRaw is the escape hatch, not the default
- **One idea per migration; review generated SQL** — a migration that touches auth, billing, and profiles is three migrations waiting to burn you
- **Repositories wrap Prisma so models don't cross the layer untranslated** — map Prisma records to domain types at the boundary and translate errors (§6)
- **Favour the JSON feature-set that matches your DB** — Postgres JSONB queries via path operators stay typed-ish without denormalizing prematurely
- [ ] schema.prisma is the single source of truth; generate on install
- [ ] cuid()/uuid() ids, @updatedAt, enums for closed sets
- [ ] @@index on every filtered/sorted/joined column pattern

## Focus areas

- 1. Setup & Generation
- 2. Schema Modeling
- 3. Migrations Workflow
- 4. Querying (Client Usage)
- 5. Transactions & Concurrency
- 6. Errors & Edge Cases
- 7. Performance Rules
- 8. Seeding & Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
