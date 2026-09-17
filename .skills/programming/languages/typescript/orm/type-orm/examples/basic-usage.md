# TypeORM Best Practices: Basic Usage

Best practices for using TypeORM — the TypeScript ORM conventions for relational databases. Use when writing, structuring, or reviewing TypeORM — covers datasource config, entities, relations, querying, migrations, performance, and testing.

## Scenario

Use this example as a starting point when applying **typeorm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. DataSource & Connection** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
