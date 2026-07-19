# TypeORM Best Practices: 6. Performance

## Source guidance

This example applies the **6. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **N+1 is the #1 read bug** — eager-load with `relations:`/`leftJoinAndSelect`, or cheat with a window/keyset of IDs.
- **Pagination in SQL (`take`/`skip` or keyset on a stable column)** — never load-all + `array.slice`.
- **`select` projections sever unneeded columns; `find` with `raw` only when the shape really is raw.**
- **Batch writes in one transaction** — N inserts are N round trips otherwise:
- **`pool_size`/`max` + `pool_timeout` respected; retry transient deadlocks (`40001`/`40P01`) with named backoff.**
- **Explain the slow ones** — `query: ExplainAnalyze` or the DB's `EXPLAIN ANALYZE` on the generated SQL.

## Example

```ts
await repo.save(docs, { transaction: true, chunk: 500 });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for typeorm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
