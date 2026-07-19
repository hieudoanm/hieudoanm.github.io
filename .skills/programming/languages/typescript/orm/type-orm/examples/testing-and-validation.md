# TypeORM Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Integration tests against the same DB engine (Postgres container)** — SQLite masks type/operator behavior:
- **Contract tests**: create, update, delete, uniqueness violation, relation eager-load, transaction rollback.
- **Fakes at the repo seam for unit tests; the entity/DB boundary gets the real integration suite.**
- **Deterministic ordering/timestamps** — seeded fixtures, frozen clocks, stable `order by id`.

## Example

```ts
beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);   // test DB only
});
beforeEach(async () => {
  await AppDataSource.query("TRUNCATE users, visits RESTART IDENTITY");
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for typeorm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
