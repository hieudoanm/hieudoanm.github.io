# Prisma ORM Best Practices

Prisma turns your database schema into a typed query client: the schema.prisma is the single source of truth, and the generated client gives you type-safe CRUD and relations for free. Best practice here is about keeping that schema the _only_ place the data shape lives (generating, never hand-writing clients), modeling relations deliberately, and avoiding the classic foot-guns — N+1 queries, missing select, un-indexed...

## When to use

Use when creating, structuring, or reviewing a Prisma schema, migrations, or client queries.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Prisma ORM Best Practices: Basic Usage](./examples/basic-usage.md)
- [Prisma ORM Best Practices: 5. Transactions & Concurrency](./examples/reliability-and-edge-cases.md)
- [Prisma ORM Best Practices: 2. Schema Modeling](./examples/setup-and-configuration.md)
- [Prisma ORM Best Practices: 8. Seeding & Testing](./examples/testing-and-validation.md)

## Assets

- [Prisma ORM Best Practices: Decision Record](./assets/decision-record.md)
- [Prisma ORM Best Practices: Starter Template](./assets/starter-template.md)
- [Prisma ORM Best Practices: Validation Plan](./assets/validation-plan.md)
- [Prisma ORM Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
