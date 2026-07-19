# Mongoose Best Practices: Basic Usage

Best practices for using Mongoose — the MongoDB ODM conventions for Node.js. Use when writing, structuring, or reviewing Mongoose — covers schemas, models, queries, validation, indexing, transactions, and testing.

## Scenario

Use this example as a starting point when applying **mongoose-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Schemas & Models** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: () => new Date(), immutable: true },
  },
  { timestamps: true, versionKey: false }
);
export const User = model("User", userSchema);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
