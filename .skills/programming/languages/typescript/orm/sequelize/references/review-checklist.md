# Review checklist

Focused reference for **sequelize-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 8. Testing

- **Integration tests against the same DB engine (Postgres container); `sequelize.sync({ force: true })` per suite**:

```ts
beforeEach(async () => {
  await sequelize.sync({ force: true });   // test DB only
});
```

- **Contract coverage**: create, update, delete, uniqueness violation, association eager-load, cascade, transaction rollback.
- **Fakes at the repo/service seam for unit tests** — the model/DB boundary gets integration.
- **Deterministic order/times** — frozen clocks, stable `order by id`, seeded fixtures.

---

## General Rules of Thumb

- **Models `init`ged with `underscored`, `tableName`, tight `DataTypes` — the schema is in the model.**
- **Associations declared both sides; `include` eagerly; project via `attributes`.**
- **Validation at the model; hooks small; `Op.*` for operators, never string SQL assembly.**
- **`transaction()` everywhere or nowhere in the callback.**
- **Migrations reviewed, one per change, never `sync()` in prod.**
- **`EXPLAIN` before you optimize; the DB boundary is where read cost lives.**

---

## Quick-Start Checklist

- [ ] `Model.init` with `tableName` + `underscored`; `DECIMAL` money; `STRING(n)` bounded
- [ ] Associations on both sides with explicit `foreignKey`; aliased `as:` when needed
- [ ] `include` eager-loading; `attributes` projections; `count`/`findAndCountAll` in SQL
- [ ] `validate` at the model; small hooks; `Op.*` operators only
- [ ] `transaction()` for multi-entity invariants; tx handle on every op
- [ ] `sequelize-cli` migrations generated + reviewed; `down()` present
- [ ] Keyset pagination; `raw: true` reads; `bulkCreate`/`increment` for volume
- [ ] Indexes declared for where/order keys; `EXPLAIN` slow queries
- [ ] Postgres-container integration tests; sync per suite; contract coverage
