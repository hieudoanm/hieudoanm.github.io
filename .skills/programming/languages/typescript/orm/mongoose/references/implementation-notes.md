# Implementation notes

Focused reference for **mongoose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
