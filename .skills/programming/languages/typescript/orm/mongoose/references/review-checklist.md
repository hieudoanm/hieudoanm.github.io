# Review checklist

Focused reference for **mongoose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
