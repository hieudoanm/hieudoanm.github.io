# Review checklist

Focused reference for **typeorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Integration tests against the same DB engine (Postgres container)** — SQLite masks type/operator behavior:

```ts
beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);   // test DB only
});
beforeEach(async () => {
  await AppDataSource.query("TRUNCATE users, visits RESTART IDENTITY");
});
```

- **Contract tests**: create, update, delete, uniqueness violation, relation eager-load, transaction rollback.
- **Fakes at the repo seam for unit tests; the entity/DB boundary gets the real integration suite.**
- **Deterministic ordering/timestamps** — seeded fixtures, frozen clocks, stable `order by id`.

---

## General Rules of Thumb

- **One `DataSource`; `synchronize: false` everywhere that ships.**
- **Entities are schema + type; column types intentional (numeric, timestamptz).**
- **Eager-load relations; projections for reads; aggregates in SQL.**
- **`transaction()` for multi-entity invariants; every op through the manager.**
- **Migrations: generated, reviewed, one change each.**
- **Pooled, retried, explained — the DB boundary is where the money is.**

---

## Quick-Start Checklist

- [ ] Single `DataSource`, `synchronize: false`, `logging` via env; one connection
- [ ] `@Entity`/`@Column` tight types; `@Index` on hot keys; relations explicit
- [ ] `find` with `where/relations/order/take/skip`; no lazy-load N+1
- [ ] `select:` projections on read-only payloads; counts/aggregates in SQL
- [ ] `transaction()` with the manager throughout; short transactions
- [ ] Migrations generated + reviewed; one change per migration; reversible
- [ ] Keyset/`take`-based pagination; batch saves per transaction; deadlock retries
- [ ] Postgres-container integration tests; truncated per suite; contract coverage
