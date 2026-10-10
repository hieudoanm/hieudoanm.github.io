# MikroORM Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Containerized real DB (Postgres for SQL path) and a `fork` per test** — isolation is the context, not a hack:
- **Seede `@Seeder`/raw fixtures typed** — deterministic rows, frozen clocks.
- **Contract tests**: CRUD, uniqueness, optimistic-lock failure, populate shape, transaction rollback, soft-delete filter behavior.
- **Fakes at the repo seam for unit tests; the ORM boundary gets the integration suite.**

## Example

```ts
beforeEach(async () => {
  await orm.schema.refreshDatabase();   // or wipe + re-seed per suite
  em = orm.em.fork();
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for mikroorm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
