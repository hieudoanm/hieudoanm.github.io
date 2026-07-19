# Drizzle ORM Best Practices: 8. Seeding & Testing

## Source guidance

This example applies the **8. Seeding & Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Seed with plain scripts against the schema module** — `tsx src/db/seed.ts` building `insert(...).values([...])`; keep fixtures typed by `$inferInsert` so seeds can't drift from schema:
- **Tests: SQLite in-memory (or a dedicated test DB)** — Drizzle supports multiple dialects, so unit-test the schema/relations against `sqlite`/`pg-mem` with the same schema module; use `migrate` or `push` to build the test schema.
- **Reset per suite** — truncate tables (`delete $ from ...`) in a beforeEach/afterEach, never accumulate across tests.

## Example

```ts
// src/db/seed.ts
const fixtureUsers: NewUser[] = [{ email: 'admin@example.com', name: 'Admin' }];
await db.insert(users).values(fixtureUsers);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for drizzle-orm-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
