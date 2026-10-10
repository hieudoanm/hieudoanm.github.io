# Implementation notes

Focused reference for **sequelize-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`sequelize.transaction()` for multi-entity invariants; every op through the tx handle:**

```ts
await sequelize.transaction(async (t) => {
  await LedgerEntry.create(entry, { transaction: t });
  await Account.increment("balance", { by: -amount, transaction: t });
});
```

- **Pass `transaction` into every query/instance-save inside the callback** — one missed `transaction` breaks atomicity silently.
- **Isolation levels deliberately chosen only when correctness demands** (`SERIALIZABLE` for the racy write patterns).
- **Short transactions ONLY; all slow I/O outside the boundary.**

---

## 6. Migrations

- **`sequelize-cli` is the schema's source of truth:**

```bash
npx sequelize-cli migration:generate --name add-user-active
npx sequelize-cli db:migrate
```

- **Review every generated migration** — autogenerate reflects current intent; backfills and data transforms are hand-written.
- **One conceptual change per migration; `down()` present unless data loss is intentional.**
- **`define: { underscored: true }` shared config keeps naming consistent between model and migration.**
- **Run migrations as a deploy step, not on first boot (`sync()` never in shipping code).**

---

## 7. Performance

- **N+1 is the first suspect** — `include` eagerly or batch by ID list:

```ts
const visits = await Visit.findAll({ where: { userId: { [Op.in]: ids } } });
```

- **`findAll({ raw: true })` for read-only payloads** — skip instance wrapping when you render JSON only.
- **Bulk**: `bulkCreate` with `{ transaction: true }`/`chunkSize` for load; updates via `update`/`increment` (single statement) over read-modify-write.
- **Indexes for `where`/`order` keys declared in a migration** — an unindexed `findAll` is the usual "slow query" story.
- **`EXPLAIN ANALYZE`/`EXPLAIN` the generated SQL (`logging: console.log` in dev) before optimizing anything else.**
