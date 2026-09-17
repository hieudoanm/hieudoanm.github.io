# Workflow notes

Focused reference for **sequelize-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
