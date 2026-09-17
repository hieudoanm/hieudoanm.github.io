# MikroORM Best Practices: Basic Usage

Best practices for using MikroORM — the TypeScript ORM conventions for SQL and MongoDB. Use when writing, structuring, or reviewing MikroORM — covers entity definition, unit of work, identity map, relations, querying, migrations, performance, and testing.

## Scenario

Use this example as a starting point when applying **mikroorm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. ORM Setup & Context** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
export const orm = await MikroORM.init({
  entities: [User, Visit],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  migrations: { path: "./migrations" },
  debug: process.env.SQL_ECHO === "true",
});

// per request/handler:
const em = orm.em.fork();
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
