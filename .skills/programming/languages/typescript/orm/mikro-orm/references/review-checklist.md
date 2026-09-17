# Review checklist

Focused reference for **mikroorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
const users = await em.find(User, { active: true }, { populate: ["visits", "visits.author"] });
```

- **Projections**: `fields: ["id", "email"]`/`select` to fetch less than the whole document where the reads are hot.
- **`em.persist` batches mutate in one flush; `nativeInsert`/`nativeUpdate`/`nativeDelete` for pure-data bulk.**
- **Pagination with `limit/offset`, or keyset on a stable field for deep pages.**
- **`EXPLAIN`/debug logging (`debug: true`) the generated SQL before reaching for indexes you don't have** — an index on every `where`/`orderBy` column first.

---

## 8. Testing

- **Containerized real DB (Postgres for SQL path) and a `fork` per test** — isolation is the context, not a hack:

```ts
beforeEach(async () => {
  await orm.schema.refreshDatabase();   // or wipe + re-seed per suite
  em = orm.em.fork();
});
```

- **Seede `@Seeder`/raw fixtures typed** — deterministic rows, frozen clocks.
- **Contract tests**: CRUD, uniqueness, optimistic-lock failure, populate shape, transaction rollback, soft-delete filter behavior.
- **Fakes at the repo seam for unit tests; the ORM boundary gets the integration suite.**

---

## General Rules of Thumb

- **One `em` per unit of work; fork for isolation, never share across calls.**
- **Entities are schema + type; `numeric` money; no floats.**
- **`populate` eagerly; projections for reads; filters are known, not incidental.**
- **UoW flushes once; `transactional` for multi-entity invariants; `@Version` for races.**
- **Migrations reviewed, one per change, never `synchronize` in prod.**
- **Debug/EXPLAIN before optimizing; the DB boundary owns read cost.**

---

## Quick-Start Checklist

- [ ] One `MikroORM` init; `em.fork()` per request/worker; `synchronize: false`
- [ ] Decorator entities with tight columnTypes (`numeric`, `varchar(n)`, `@Enum`)
- [ ] `populate` eager relations; `fields`/projections on read paths
- [ ] Identity map + UoW understood; `flush()` once; detached handled deliberately
- [ ] `@Filter` soft-delete behavior checked; QueryBuilder for dynamic cases
- [ ] Migrations created + reviewed; one change per migration; `down()` present
- [ ] `transactional` invariants; `@Version` optimistic lock; funded pessimism only
- [ ] Batch/persist in one flush; native ops for bulk; keyset deep pagination
- [ ] `EXPLAIN`/SQL debug before optimizing; index hot where/order columns
- [ ] Real-DB integration tests (fork per case) + contract coverage
