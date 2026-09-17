# TypeORM Best Practices: Starter Template

A reusable starting point derived from the **1. DataSource & Connection** section of [TypeORM Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  entities: [User, Visit],
  migrations: ["./migrations/*.{ts,js}"],
  synchronize: false,        // NEVER synchronize in shipping code
  logging: process.env.SQL_ECHO === "true",
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
