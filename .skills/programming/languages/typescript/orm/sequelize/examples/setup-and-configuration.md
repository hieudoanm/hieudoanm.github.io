# Sequelize Best Practices: 1. Models & Definitions

## Source guidance

This example applies the **1. Models & Definitions** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **A `Model` class is the schema contract:**
- **`tableName` explicit; `underscored: true`** maps snake_case columns to camelCase attributes — one convention.
- **Tight types**: `DataTypes.STRING(n)` bounded, `DECIMAL(10, 2)` for money (never `FLOAT`), `DATE`/`DATEONLY` deliberately, `JSONB` for Postgres JSON.
- **`timestamps: true` default; `paranoid: true` for soft delete only where the audit story demands it** (it hides rows from every default query).
- **TS `declare` fields bring types; `init` sets the column metadata — one model, two halves of a contract.**

## Example

This excerpt is from the cited **1. Models & Definitions** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for sequelize-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
