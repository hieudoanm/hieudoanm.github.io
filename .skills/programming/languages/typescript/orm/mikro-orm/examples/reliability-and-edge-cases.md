# MikroORM Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **N+1 is the #1 read bug — `populate` the shape you render:**
- **Projections**: `fields: ["id", "email"]`/`select` to fetch less than the whole document where the reads are hot.
- **`em.persist` batches mutate in one flush; `nativeInsert`/`nativeUpdate`/`nativeDelete` for pure-data bulk.**
- **Pagination with `limit/offset`, or keyset on a stable field for deep pages.**
- **`EXPLAIN`/debug logging (`debug: true`) the generated SQL before reaching for indexes you don't have** — an index on every `where`/`orderBy` column first.

## Example

```ts
const users = await em.find(User, { active: true }, { populate: ["visits", "visits.author"] });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for mikroorm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
