---
name: sequelize-best-practices
description: Best practices for using Sequelize — the Node.js ORM conventions for SQL databases. Use when writing, structuring, or reviewing Sequelize — covers models, associations, queries, validations, migrations, transactions, performance, and testing.
---

# Sequelize Best Practices

Sequelize is the classic Node.js ORM for SQL databases — **models** defined as `Model` subclasses with explicit attribute types, **associations** (`hasMany`/`belongsTo`) that generate columns and eager-loading, and a **promise-based API** whose `.findAll({ where, include })` reads as the query. Practical Sequelize leans on **typed models with explicit table names + `underscored` discipline, explicit `include`/`attributes` over magic eager-loading, and migrations (`sequelize-cli`) as the only schema path**.

---

## 1. Models & Definitions

- **A `Model` class is the schema contract:**

```ts
class User extends Model {
  declare id: number;
  declare email: string;
  declare active: boolean;
  declare readonly createdAt: Date;
}

User.init(
  {
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "users", underscored: true }
);
```

- **`tableName` explicit; `underscored: true`** maps snake_case columns to camelCase attributes — one convention.
- **Tight types**: `DataTypes.STRING(n)` bounded, `DECIMAL(10, 2)` for money (never `FLOAT`), `DATE`/`DATEONLY` deliberately, `JSONB` for Postgres JSON.
- **`timestamps: true` default; `paranoid: true` for soft delete only where the audit story demands it** (it hides rows from every default query).
- **TS `declare` fields bring types; `init` sets the column metadata — one model, two halves of a contract.**

---

## 2. Associations

- **Associations defined once, on the right side, with `foreignKey` explicit:**

```ts
Visit.belongsTo(User, { foreignKey: "userId" });   // users.id <- visits.user_id
User.hasMany(Visit, { foreignKey: "userId" });
```

- **Both sides declared** so eager-loading and FKs are consistent; `as:` names the aliased relation when it's ambiguous.
- **`include` the relation to avoid N+1:**

```ts
const users = await User.findAll({
  where: { active: true },
  include: [{ model: Visit, as: "visits", attributes: ["id", "occurredAt"] }],
});
```

- **Functions of attributes belong to `literal`/`sequelize.fn` explicitly** — you're writing SQL; make it readable.
- **`paranoid` + association `paranoid` interplay checked** — soft-deleted parents with eager children surprise.

---

## 3. Querying & Projection

- **`findAll`/`findOne` with a `where` contract; projections deliberate:**

```ts
const lastAdmins = await User.findAll({
  where: { role: "admin" },
  attributes: ["id", "email"],
  order: [["createdAt", "DESC"]],
  limit: 20,
});
```

- **`attributes: { exclude: ["password"] }`** over shipping whole documents read-only.
- **Counts in SQL**: `User.count({ where })`, `findAndCountAll` for page metadata — never `users.length`.
- **Pagination keyset on a stable column** for deep pages; `limit/offset` fine for shallow.
- **`Op` operators (`Op.or`, `Op.in`, `Op.like` with escaped input) over string concatenation** — literal injection risk is a real CVE source.

---

## 4. Validations & Hooks

- **`validate` at the model boundary — `notEmpty`, `isEmail`, custom:

```ts
email: {
  type: DataTypes.STRING(255),
  validate: { isEmail: true, notEmpty: true },
}
```

- **Hooks (`beforeValidate`, `beforeSave`, `afterUpdate`) small and narrowly scoped** — they run on every instance path, so keep them side-effect-light.
- **`instance.getDataValue`/`setDataValue` across hooks; normalize in `beforeValidate` (trim/lowercase) — one place.**
- **Unique violations surface as DB errors** — catch/map them into domain errors at the service boundary, don't pre-check then race.

---

## 5. Transactions

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