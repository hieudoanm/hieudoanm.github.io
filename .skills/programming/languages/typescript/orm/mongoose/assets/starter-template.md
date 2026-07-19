# Mongoose Best Practices: Starter Template

A reusable starting point derived from the **1. Schemas & Models** section of [Mongoose Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
