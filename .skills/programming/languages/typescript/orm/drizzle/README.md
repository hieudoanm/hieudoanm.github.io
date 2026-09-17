# Drizzle ORM Best Practices

Drizzle is a "headless" TypeScript ORM: schema is _code_ (drizzle.ts), the client is lightweight, and it stays close to SQL — type-safety without hiding the query. Best practice here is about treating the schema module as the single source of truth, using drizzle-kit for migrations, and knowing when the SQL-adjacent power (tagged sql\\``, relational queries, prepared statements) should be used instead of emulating a...

## When to use

Use when creating, structuring, or reviewing a Drizzle schema, migrations, or queries.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Drizzle ORM Best Practices: Basic Usage](./examples/basic-usage.md)
- [Drizzle ORM Best Practices: 5. Prepared Statements & Performance](./examples/reliability-and-edge-cases.md)
- [Drizzle ORM Best Practices: 1. Setup & Schema as Code](./examples/setup-and-configuration.md)
- [Drizzle ORM Best Practices: 8. Seeding & Testing](./examples/testing-and-validation.md)

## Assets

- [Drizzle ORM Best Practices: Decision Record](./assets/decision-record.md)
- [Drizzle ORM Best Practices: Starter Template](./assets/starter-template.md)
- [Drizzle ORM Best Practices: Validation Plan](./assets/validation-plan.md)
- [Drizzle ORM Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
