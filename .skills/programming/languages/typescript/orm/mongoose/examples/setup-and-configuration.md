# Mongoose Best Practices: 1. Schemas & Models

## Source guidance

This example applies the **1. Schemas & Models** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Schemas are the document contract — tighter beats looser:**
- **`timestamps: true` for `createdAt`/`updatedAt`; `versionKey: false` unless you need optimistic versioning.**
- **`enum`/`required`/`minmax` at the schema, not the service layer** — validation belongs to the data boundary.
- **Document composition**: reference other collections by `ObjectId` (`ref:`) rather than storing nested pod documents that drift.
- **One model per collection, exported from a single module** so `model()` mistypes are compile-time-signaled; TS generics: `model<UserDoc>("User", userSchema)`.

## Example

This excerpt is from the cited **1. Schemas & Models** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mongoose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
