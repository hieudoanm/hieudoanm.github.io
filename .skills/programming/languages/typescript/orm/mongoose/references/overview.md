# Overview

Focused reference for **mongoose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Mongoose Best Practices

Mongoose is the MongoDB object-document mapper for Node.js — it puts a **schema and validation layer over flexible documents**. Practical Mongoose leans on **explicit schemas that are stricter than need be, lean documents (referenced, not nested blobs), and queries that hit the indexes you define**. MongoDB rewards documents shaped for the access pattern — so design the schema from the query, then let the ODM enforce it.

---

## 1. Schemas & Models

- **Schemas are the document contract — tighter beats looser:**

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

- **`timestamps: true` for `createdAt`/`updatedAt`; `versionKey: false` unless you need optimistic versioning.**
- **`enum`/`required`/`minmax` at the schema, not the service layer** — validation belongs to the data boundary.
- **Document composition**: reference other collections by `ObjectId` (`ref:`) rather than storing nested pod documents that drift.
- **One model per collection, exported from a single module** so `model()` mistypes are compile-time-signaled; TS generics: `model<UserDoc>("User", userSchema)`.

---

## 2. Queries

- **Query, then execute — always `await`:** `Model.find().where(...).exec()`; never chain un-awaited promises:

```ts
const users = await User.find({ role: "admin" }).sort({ createdAt: -1 }).limit(20).exec();
```

- **Projection via `select("name email")`/`.select("-password")`** — never ship whole documents when the consumer needs 2 fields.
- **Use `.lean()` for read-only data** — plain JS documents, no hydration overhead:

```ts
return await User.findById(id).select("name email").lean();
```
