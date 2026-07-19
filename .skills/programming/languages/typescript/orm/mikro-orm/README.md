# MikroORM Best Practices

MikroORM is a TypeScript data-mapper ORM with a **unit of work**: entities are plain objects, and em.flush() persists every tracked change in one transaction. Practical MikroORM leans on **a single MikroORM/EntityManager per request, em.fork() for isolated contexts, entities as the schema (decorators or schema-first), and explicit populate over lazy ref access**. The magic is real but bounded — understand what managed vs...

## When to use

Use when writing, structuring, or reviewing MikroORM.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [MikroORM Best Practices: Basic Usage](./examples/basic-usage.md)
- [MikroORM Best Practices: 7. Performance](./examples/reliability-and-edge-cases.md)
- [MikroORM Best Practices: 5. Migrations & Schema](./examples/setup-and-configuration.md)
- [MikroORM Best Practices: 8. Testing](./examples/testing-and-validation.md)

## Assets

- [MikroORM Best Practices: Decision Record](./assets/decision-record.md)
- [MikroORM Best Practices: Starter Template](./assets/starter-template.md)
- [MikroORM Best Practices: Validation Plan](./assets/validation-plan.md)
- [MikroORM Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
