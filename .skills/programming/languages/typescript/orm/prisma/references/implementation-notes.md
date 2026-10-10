# Implementation notes

Focused reference for **prisma-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Transactions & Concurrency

- **Interactive transactions for multi-step operations that must commit atomically** (`$transaction(async (tx) => {...})`) — the async body runs in one tx; throw to roll back:

```ts
await prisma.$transaction(async (tx) => {
    const acct = await tx.account.findUnique({ where: { id } });
    if (!acct) throw new AccountNotFound(id);
    await tx.account.update({ where: { id }, data: { balance: { decrement: amt } } });
    await tx.ledger.create({ data: { ... } });
});
```

- **Atomic field mutations over read-modify-write** — `{ increment, decrement, set }` updates run server-side; never fetch-then-write for counters/balances (the classic race).
- **Keep transactions short** — no network calls/user waits inside; a long tx pinning rows is a concurrency bug waiting to happen.
- **Shared `PrismaClient` (singleton) + `$transaction` respect connection pools** — don't instantiate per request (exhausts pool); a single client reuses the connect.

---

## 6. Errors & Edge Cases

- **`Prisma.PrismaClientKnownRequestError` has a stable `code`** — the P-codes (`P2002` unique, `P2025` not found) let you map failures to HTTP/user errors exactly:

```ts
try {
  await prisma.user.create({ data });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
    throw new EmailTaken(email); // retype into your domain error
  }
  throw e;
}
```

- **Map the common codes once** (`P2002` unique constraint, `P2003` FK violated, `P2025` record to operate on missing, `P2014` relation violation) into typed domain errors at the repository layer.
- **`Promise` rejections from queries are `PrismaClientUnknownRequestError` for network/connection** — treat connectivity errors as retryable; data errors as fatal.
- **Never expose Prisma error text straight to users** — the SQL context leaks schema; translate to actionable messages.

---

## 7. Performance Rules
