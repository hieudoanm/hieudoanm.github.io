# Overview

Focused reference for **sequelize-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
