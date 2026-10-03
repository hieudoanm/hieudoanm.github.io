---
name: typeorm-best-practices
description: Best practices for using TypeORM — the TypeScript ORM conventions for relational databases. Use when writing, structuring, or reviewing TypeORM — covers datasource config, entities, relations, querying, migrations, performance, and testing.
---

# TypeORM Best Practices

TypeORM is a TypeScript ORM for relational databases that models tables as **classes decorated with metadata** (`@Entity`, `@Column`). Practical TypeORM leans on **a single `DataSource` created once, entities that are both the schema and the type shape, explicit relation loading (`relations:`/`FindOptions`), and migrations as the only schema evolution path**. The Repository/EntityManager boundary keeps queries typed; the query builder is there for the genuinely dynamic cases.

---

## 1. DataSource & Connection

- **One `DataSource` per app, initialized once at startup:**

```ts
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  entities: [User, Visit],
  migrations: ["./migrations/*.{ts,js}"],
  synchronize: false,        // NEVER synchronize in shipping code
  logging: process.env.SQL_ECHO === "true",
});
```

- **`synchronize: false` in everything except throwaway dev DBs** — schema drift via sync is a prod incident waiting.
- **Reuse the pool** — one connection from DI, not a new `DataSource` per request.
- **`getRepository(Entity)`/`dataSource.getRepository` over re-scanning `EntityManager` per call** — repositories are cheap, consistent wrappers.

---

## 2. Entities

- **Entities are the schema and the type — front loaded with intention:**

```ts
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
```

- **Column types chosen per DB** — `numeric` for money (never `float`), `timestamptz` for instants (`{ type: "timestamptz" }`), `varchar(n)` bounded.
- **`@Index()` on hot query/filter keys; composite via `@Index(["a", "b"]).`**
- **Relations declared once (`@ManyToOne`/`@OneToMany` with `inverseSide`)** — the FK column is explicit, the JS side optional.
- **Named the class after the domain and `@Entity` name explicit** — `User` in code, `user` table; no magic.

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

---

## 5. Migrations

- **Migrations are the schema's history — generated, then reviewed:**

```bash
typeorm migration:generate -d ormconfig.ts Migrations/AddUserActive
typeorm migration:run -d ormconfig.ts
```

- **Review each generated migration** — autogenerate reflects entity-current, not intent; data backfills are hand-written.
- **One conceptual change per migration; reversible (`down`) where data loss isn't intended.**
- **`entity` + `migrations` configured once; never `synchronize` in staging/prod.**
- **Indexes/constraints flow from the entity annotations** — a migration missing an index is a schema mistake.

---

## 6. Performance

- **N+1 is the #1 read bug** — eager-load with `relations:`/`leftJoinAndSelect`, or cheat with a window/keyset of IDs.
- **Pagination in SQL (`take`/`skip` or keyset on a stable column)** — never load-all + `array.slice`.
- **`select` projections sever unneeded columns; `find` with `raw` only when the shape really is raw.**
- **Batch writes in one transaction** — N inserts are N round trips otherwise:

```ts
await repo.save(docs, { transaction: true, chunk: 500 });
```

- **`pool_size`/`max` + `pool_timeout` respected; retry transient deadlocks (`40001`/`40P01`) with named backoff.**
- **Explain the slow ones** — `query: ExplainAnalyze` or the DB's `EXPLAIN ANALYZE` on the generated SQL.

---

## 7. Testing

- **Integration tests against the same DB engine (Postgres container)** — SQLite masks type/operator behavior:

```ts
beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);   // test DB only
});
beforeEach(async () => {
  await AppDataSource.query("TRUNCATE users, visits RESTART IDENTITY");
});
```

- **Contract tests**: create, update, delete, uniqueness violation, relation eager-load, transaction rollback.
- **Fakes at the repo seam for unit tests; the entity/DB boundary gets the real integration suite.**
- **Deterministic ordering/timestamps** — seeded fixtures, frozen clocks, stable `order by id`.

---

## General Rules of Thumb

- **One `DataSource`; `synchronize: false` everywhere that ships.**
- **Entities are schema + type; column types intentional (numeric, timestamptz).**
- **Eager-load relations; projections for reads; aggregates in SQL.**
- **`transaction()` for multi-entity invariants; every op through the manager.**
- **Migrations: generated, reviewed, one change each.**
- **Pooled, retried, explained — the DB boundary is where the money is.**

---

## Quick-Start Checklist

- [ ] Single `DataSource`, `synchronize: false`, `logging` via env; one connection
- [ ] `@Entity`/`@Column` tight types; `@Index` on hot keys; relations explicit
- [ ] `find` with `where/relations/order/take/skip`; no lazy-load N+1
- [ ] `select:` projections on read-only payloads; counts/aggregates in SQL
- [ ] `transaction()` with the manager throughout; short transactions
- [ ] Migrations generated + reviewed; one change per migration; reversible
- [ ] Keyset/`take`-based pagination; batch saves per transaction; deadlock retries
- [ ] Postgres-container integration tests; truncated per suite; contract coverage