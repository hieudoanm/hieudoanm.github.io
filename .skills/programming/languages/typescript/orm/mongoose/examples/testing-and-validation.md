# Mongoose Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`mongodb-memory-server` or a per-suite drop/recreate** for isolation:
- **Test the contract**: create, validation failure, uniqueness, query-by-index, keyset pagination, transactions rollback.
- **Fake at the repository seam for unit tests; integration against a real MongoDB in a container is the truth.**
- **Deterministic time** — freeze `Date.now()` for timestamps-dependent assertions.

## Example

```ts
beforeEach(async () => { await Order.deleteMany({}); });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for mongoose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
