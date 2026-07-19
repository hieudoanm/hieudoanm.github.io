# Workflow notes

Focused reference for **mongoose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
