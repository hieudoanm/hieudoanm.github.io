# Sequelize Best Practices: Basic Usage

Best practices for using Sequelize — the Node.js ORM conventions for SQL databases. Use when writing, structuring, or reviewing Sequelize — covers models, associations, queries, validations, migrations, transactions, performance, and testing.

## Scenario

Use this example as a starting point when applying **sequelize-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Models & Definitions** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
