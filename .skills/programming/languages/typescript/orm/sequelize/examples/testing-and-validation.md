# Sequelize Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Integration tests against the same DB engine (Postgres container); `sequelize.sync({ force: true })` per suite**:
- **Contract coverage**: create, update, delete, uniqueness violation, association eager-load, cascade, transaction rollback.
- **Fakes at the repo/service seam for unit tests** — the model/DB boundary gets integration.
- **Deterministic order/times** — frozen clocks, stable `order by id`, seeded fixtures.

## Example

```ts
beforeEach(async () => {
  await sequelize.sync({ force: true });   // test DB only
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for sequelize-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
