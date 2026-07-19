# Workflow notes

Focused reference for **typeorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. Relations & Querying

- **`FindOptions` for the 90% structured query; relations loaded explicitly:**

```ts
const users = await repo.find({
  where: { account: { id: accountId }, active: true },
  relations: { visits: true },
  order: { createdAt: "DESC" },
  take: 20,
  skip: 0,
});
```

- **`relations`/`leftJoinAndSelect` chosen eagerly** — never lazy relation access that fires extra queries in a loop (N+1).
- **`select:` projections for read-only payloads** — don't hydrate documents you won't use.
- **`dataSource.createQueryBuilder` only for dynamic/filter-heavy queries**:

```ts
const rows = await ds
  .createQueryBuilder()
  .select("u.email")
  .from(User, "u")
  .where("u.active = :active", { active: true })
  .getRawMany();
```

- **Counts/aggregates in SQL** — `.getCount()`, `qb.select("count()")`, not `.find().length`.

---

## 4. Transactions

- **`dataSource.transaction()` for multi-entity invariants:**

```ts
await AppDataSource.transaction(async (manager) => {
  await manager.save(account, { reload: true });
  await manager.update(LedgerEntry, { id }, { amount: debit });
});
```

- **Use the transactional `EntityManager` for every operation inside the callback** — a stray `repo.save` bypasses atomicity.
- **`PessimisticWrite`/`ForUpdate` locks for read-modify-write races with `findOne({ lock })` — deliberate and named.**
- **Keep transactions short; do I/O before, not inside, the transaction boundary.**
