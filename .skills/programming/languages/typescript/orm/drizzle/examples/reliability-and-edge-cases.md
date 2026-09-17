# Drizzle ORM Best Practices: 5. Prepared Statements & Performance

## Source guidance

This example applies the **5. Prepared Statements & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Prepared statements for hot, repeatable queries** — `.prepare("name")` a repeatable query and call it with args; one parse, your DB caches the plan:
- **`$queryRaw` is _not_ the escape hatch it is in other ORMs — it's a first-class tool**; use tagged `sql\`\`` freely for aggregates, JSON columns, and reporting where the builder reads worse than SQL.
- **Indexes live in the schema** (`index(...)`) — add them on the exact `where`/`orderBy`/join predicates; generate them into migrations like any other schema change.

## Example

```ts
const byIdStmt = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder('id')))
  .prepare('user_by_id');

const user = await byIdStmt.execute({ id: '…' });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for drizzle-orm-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
