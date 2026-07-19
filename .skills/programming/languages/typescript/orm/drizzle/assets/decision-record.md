# Drizzle ORM Best Practices: Decision Record

Use this record when applying [Drizzle ORM Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building database layers with Drizzle ORM (TypeScript). Use when creating, structuring, or reviewing a Drizzle schema, migrations, or queries — covers schema/relations, drizzle-kit workflow, relational queries, raw SQL, transactions, and testing.

Drizzle is a "headless" TypeScript ORM: schema is _code_ (drizzle.ts), the client is lightweight, and it stays close to SQL — type-safety without hiding the query. Best practice here is about treating the schema module as the single source of truth, using drizzle-kit for migrations, and knowing when the SQL-adjacent power (tagged sql\\``, relational queries, prepared statements) should be used instead of emulating a framework ORM.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Setup & Schema as Code
- [ ] 2. Relations & Type Safety
- [ ] 3. Drizzle-Kit Workflow (Migrations)
- [ ] 4. Querying
- [ ] 5. Prepared Statements & Performance
- [ ] 6. Transactions & Batchs
- [ ] 7. Errors & Edge Cases
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
