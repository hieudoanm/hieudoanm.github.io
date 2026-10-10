# Implementation notes

Focused reference for **drizzle-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
const byIdStmt = db
  .select()
  .from(users)
  .where(eq(users.id, sql.placeholder('id')))
  .prepare('user_by_id');

const user = await byIdStmt.execute({ id: '…' });
```

- **`$queryRaw` is _not_ the escape hatch it is in other ORMs — it's a first-class tool**; use tagged `sql\`\`` freely for aggregates, JSON columns, and reporting where the builder reads worse than SQL.
- **Indexes live in the schema** (`index(...)`) — add them on the exact `where`/`orderBy`/join predicates; generate them into migrations like any other schema change.
- **Avoid per-row awaited queries inside loops** — batch (`db.insert(...).values([...])`, `Promise.all` of `$queryRaw` batched) or relational-query the whole set; Drizzle gives you no hiding, so the SQL shows the cost.

---

## 6. Transactions & Batchs

- **`db.transaction(async (tx) => {...})`** wraps `INSERT`/`UPDATE`s atomically — never mix them with external network calls; keep the tx short and indexed-friendly:

```ts
await db.transaction(async (tx) => {
  const [acct] = await tx
    .select()
    .from(accounts)
    .where(eq(accounts.id, id))
    .for('update');
  if (!acct) throw new AccountMissing(id);
  await tx
    .update(accounts)
    .set({ balance: sql`${accounts.balance} - ${amt}` })
    .where(eq(accounts.id, id));
  await tx.insert(ledger).values({ accountId: id, delta: -amt });
});
```

- **Atomic updates with `sql\`\`` expressions over read-modify-write** — `set({ balance: sql\`${t.balance} - ${amt}\``) handles concurrency server-side, no lost updates.
- **`.for("update")` for row locks in interactive transactions** where a read-then-write race can't be avoided; prefer the atomic-expression form whenever possible.
- **`batch` for multi-statement writes** (`db.batch([insert, update])`) in D1 — atomic where supported; plain transactions for Postgres/MySQL.

---

## 7. Errors & Edge Cases

- **Drizzle errors are driver-shaped** — Postgres: `PostgresError` (from `postgres`/`node-postgres`), with `code`/`constraint` fields; MySQL: `MySqlError`. Map driver codes to domain errors at the repository layer:

```ts
try {
  await db.insert(users).values({ email });
} catch (e) {
  if (e instanceof PostgresError && e.code === '23505') {
    // unique_violation
    throw new EmailTaken(email);
  }
  throw e;
}
```

- **Translate DB codes once** (unique violation `23505`, FK `23503`, check `23514` on Postgres) into typed, user-safe messages — never surface driver text.
- **Types can lie at runtime** — `$inferInsert` types the _shape_; values still come from untrusted input, so validate with zod at the boundary (§ of the typescript skill) before touching the DB.
- **`onConflict`/upsert for idempotent writes** — `insert(...).onConflictDoUpdate({ target: users.email, set: {...} })` over check-then-insert races.
