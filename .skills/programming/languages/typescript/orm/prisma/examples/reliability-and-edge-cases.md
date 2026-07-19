# Prisma ORM Best Practices: 5. Transactions & Concurrency

## Source guidance

This example applies the **5. Transactions & Concurrency** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Interactive transactions for multi-step operations that must commit atomically** (`$transaction(async (tx) => {...})`) — the async body runs in one tx; throw to roll back:
- **Atomic field mutations over read-modify-write** — `{ increment, decrement, set }` updates run server-side; never fetch-then-write for counters/balances (the classic race).
- **Keep transactions short** — no network calls/user waits inside; a long tx pinning rows is a concurrency bug waiting to happen.
- **Shared `PrismaClient` (singleton) + `$transaction` respect connection pools** — don't instantiate per request (exhausts pool); a single client reuses the connect.

## Example

```ts
await prisma.$transaction(async (tx) => {
    const acct = await tx.account.findUnique({ where: { id } });
    if (!acct) throw new AccountNotFound(id);
    await tx.account.update({ where: { id }, data: { balance: { decrement: amt } } });
    await tx.ledger.create({ data: { ... } });
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for prisma-orm-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
