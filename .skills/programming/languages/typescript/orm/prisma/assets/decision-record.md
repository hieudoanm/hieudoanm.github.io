# Prisma ORM Best Practices: Decision Record

Use this record when applying [Prisma ORM Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building database layers with Prisma (TypeScript). Use when creating, structuring, or reviewing a Prisma schema, migrations, or client queries — covers schema design, relations, migration workflow, querying, performance, transactions, and seeding.

Prisma turns your database schema into a typed query client: the schema.prisma is the single source of truth, and the generated client gives you type-safe CRUD and relations for free. Best practice here is about keeping that schema the _only_ place the data shape lives (generating, never hand-writing clients), modeling relations deliberately, and avoiding the classic foot-guns — N+1 queries, missing select, un-indexed filters, and fat transactions.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Setup & Generation
- [ ] 2. Schema Modeling
- [ ] 3. Migrations Workflow
- [ ] 4. Querying (Client Usage)
- [ ] 5. Transactions & Concurrency
- [ ] 6. Errors & Edge Cases
- [ ] 7. Performance Rules
- [ ] 8. Seeding & Testing

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
