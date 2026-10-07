---
name: mongoose-best-practices
description: Best practices for using Mongoose — the MongoDB ODM conventions for Node.js. Use when writing, structuring, or reviewing Mongoose — covers schemas, models, queries, validation, indexing, transactions, and testing.
---

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

- **Counts via `countDocuments()`, existence via `findOne`/`findById`** — never `find().toArray().length`.
- **Pagination by keyset (`$gt` on a stable field) over `skip` for deep pages** — `skip` degrades linearly with the collection size.

---

## 3. Validation & Middleware

- **Validation at the schema layer** — `required`, `enum`, custom `validate`/`validator` for the closed rules:

```ts
email: {
  type: String,
  required: true,
  validate: (v: string) => /.+@.+\..+/.test(v),
}
```

- **Pre/post hooks for derived fields and cross-document concerns, kept small**:

```ts
userSchema.pre("save", function (next) {
  if (this.isModified("email")) this.email = this.email.toLowerCase();
  next();
});
```

- **Hooks are scoped to the operation type** (`save`, `findOneAndUpdate`, `deleteOne`) — a `pre('save')` won't run on `updateOne` bulk paths; know where validation actually fires.
- **`runValidators: true` on updates** unless intentionally bypassing (migration scripts).
- **Never trust client documents** — sanitize/whitelist assignable fields before `save`.

---

## 4. Indexes

- **Declare indexes in the schema; compound for the real access patterns:**

```ts
userSchema.index({ accountId: 1, createdAt: -1 });
```

- **Everything you `find`/`sort`/`group by` should have an index** — MongoDB without an index scans the collection.
- **`unique: true` + `partialFilterExpression`/sparse for "unique unless absent"** semantics.
- **Via `collection.createIndexes()`/migrations for prod, `autoIndex` in dev only** — never rely on the ODM drifting schema live.
- **`explain("executionStats")` before calling a query slow** — the answer is usually a missing index, not QueryCache dwarfs.

---

## 5. Relationships & Aggregations

- **Reference, don't nest** — store `authorId: ObjectId`, populate on read with `/ref/` or `$lookup` in the aggregation pipeline:

```ts
const posts = await Post.find()
  .populate({ path: "authorId", select: "name" })
  .limit(20)
  .exec();
```

- **`populate` for simple joins; aggregation `$lookup` for multi-stage pipelines.**
- **`$group`/`$unwind`/`$match` in the pipeline, not in JS** — aggregation returns finished results:

```ts
const byStatus = await Order.aggregate([
  { $match: { createdAt: { $gte: lastWeek } } },
  { $group: { _id: "$status", total: { $sum: "$amount" } } },
]).exec();
```

- **Aggregates are signed typed** (`Aggregate<Doc[]>` assertions from your aggregation interface).

---

## 6. Transactions & Atomicity

- **Multi-document updates use sessions/transactions** (replica-set deployment required):

```ts
const session = await mongoose.startSession();
try {
  session.startTransaction();
  await ledger.create([entry], { session });
  await account.updateOne({ _id }, { $inc: { balance: -amount } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
```

- **Prefer single-document atomic operators** (`$inc`, `$set`, `$push`, `$pull` with `$filter`) over read-modify-write — they're atomic without a transaction.
- **Optimistic concurrency**: `versionKey: true` maps a `__v` guard for lost-update detection on long-lived edits.

---

## 7. Performance & Memory

- **Lean reads, indexed writes, explicit projection** — the three knock-down wins.
- **Watch for `populate` storms** — nested populate chains are N+1 in disguise; consider denormalizing the display field.
- **Bulk operations for batch sync** (`bulkWrite`/`insertMany` with `ordered: false` + `skipValidation` only when deliberate).
- **Stream/`cursor()` for huge result sets** — don't `.exec()` a million-doc query into RAM.

---

## 8. Testing

- **`mongodb-memory-server` or a per-suite drop/recreate** for isolation:

```ts
beforeEach(async () => { await Order.deleteMany({}); });
```

- **Test the contract**: create, validation failure, uniqueness, query-by-index, keyset pagination, transactions rollback.
- **Fake at the repository seam for unit tests; integration against a real MongoDB in a container is the truth.**
- **Deterministic time** — freeze `Date.now()` for timestamps-dependent assertions.

---

## General Rules of Thumb

- **Design the document for the query, then enforce it with the schema.**
- **Reference, don't nest; project, don't ship; lean, don't hydrate.**
- **Indexes are the access plan — declared in schema, verified with `explain`.**
- **Atomic operators first; transactions for multi-doc invariants.**
- **`timestamps: true`, `versionKey` deliberate, validation at the boundary.**
- **Explain before you profile; `lean()` for reads you don't mutate.**

---

## Quick-Start Checklist

- [ ] Explicit schema: `required`/`enum`/`minmax`; `timestamps: true`; typed `model<T>()`
- [ ] Await every query; `.lean()` on read-only paths; `.select()` projections
- [ ] `countDocuments`/`findOne` for existence; keyset over `skip`
- [ ] Validation + small hooks; `runValidators: true` on updates
- [ ] Declared indexes cover every find/sort ($gt keyset stable field)
- [ ] ObjectId references + `populate`/`$lookup`; aggregates in the pipeline
- [ ] `$inc`/`$set` atomic ops; transactions for multi-doc invariants
- [ ] `bulkWrite` for batch sync; `cursor()` for huge result sets
- [ ] Container-Mongo integration tests; contract coverage; frozen clocks