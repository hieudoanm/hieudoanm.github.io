# MikroORM Best Practices: Starter Template

A reusable starting point derived from the **1. ORM Setup & Context** section of [MikroORM Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
