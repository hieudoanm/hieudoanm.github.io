# Implementation notes

Focused reference for **typeorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Migrations

- **Migrations are the schema's history — generated, then reviewed:**

```bash
typeorm migration:generate -d ormconfig.ts Migrations/AddUserActive
typeorm migration:run -d ormconfig.ts
```

- **Review each generated migration** — autogenerate reflects entity-current, not intent; data backfills are hand-written.
- **One conceptual change per migration; reversible (`down`) where data loss isn't intended.**
- **`entity` + `migrations` configured once; never `synchronize` in staging/prod.**
- **Indexes/constraints flow from the entity annotations** — a migration missing an index is a schema mistake.

---

## 6. Performance

- **N+1 is the #1 read bug** — eager-load with `relations:`/`leftJoinAndSelect`, or cheat with a window/keyset of IDs.
- **Pagination in SQL (`take`/`skip` or keyset on a stable column)** — never load-all + `array.slice`.
- **`select` projections sever unneeded columns; `find` with `raw` only when the shape really is raw.**
- **Batch writes in one transaction** — N inserts are N round trips otherwise:

```ts
await repo.save(docs, { transaction: true, chunk: 500 });
```

- **`pool_size`/`max` + `pool_timeout` respected; retry transient deadlocks (`40001`/`40P01`) with named backoff.**
- **Explain the slow ones** — `query: ExplainAnalyze` or the DB's `EXPLAIN ANALYZE` on the generated SQL.

---

## 7. Testing
