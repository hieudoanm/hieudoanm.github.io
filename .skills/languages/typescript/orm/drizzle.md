---
name: drizzle-orm-design
description: Best practices for building database layers with Drizzle ORM (TypeScript). Use when creating, structuring, or reviewing a Drizzle schema, migrations, or queries — covers schema/relations, drizzle-kit workflow, relational queries, raw SQL, transactions, and testing.
---

# Drizzle ORM Best Practices

Drizzle is a "headless" TypeScript ORM: schema is _code_ (`drizzle.ts`), the client is lightweight, and it stays close to SQL — type-safety without hiding the query. Best practice here is about treating the schema module as the single source of truth, using `drizzle-kit` for migrations, and knowing when the SQL-adjacent power (tagged `sql\`\``, relational queries, prepared statements) should be used instead of emulating a framework ORM.

---

## 1. Setup & Schema as Code

```ts
// src/db/schema.ts
import { pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [index('users_email_idx').on(t.email)]
);

export type User = typeof users.$inferSelect; // SELECT row type
export type NewUser = typeof users.$inferInsert; // INSERT payload type
```

- **Schema is ordinary TypeScript** (`drizzle-orm/pg-core` / `mysql-core` / `sqlite-core` / `d1`) — export the table builders and the inferred `$inferSelect`/`$inferInsert` types; the DB and the code can't drift.
- **Column names in DB vs TS names** — `pgTable` accepts a name: `text("full_name")` with `mapTo("fullName")` maps backend columns to camelCase fields (mirrors Prisma's `@map` without the DSL).
- **`$inferSelect` once, derive everywhere** — export the row type and import it; don't re-declare shapes that the schema already types.
- **Enums via native DB enum** (`pgEnum`) or TS literal unions + `text()` for SQLite — match the database's storage rather than emulating app-level enums.

```ts
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
```

---

## 2. Relations & Type Safety

- **Declare relations bidirectionally** — `one`/`many` in a `relations` export wired with `fields`/`references`; the _relational_ API (`db.query.users.findMany`) reads these for typed nested loading.
- **Foreign keys explicitly** — `.references(() => table.column, { onDelete: "cascade" | "set null" })` so delete behaviour is in the schema, not improvised per query.
- **Composite/unusual keys** — relations support multi-column via arrays of `fields`/`references`; test the relational query compiles before growing.
- **Type-push via templates** — `typeof db.query.users.$inferSelect` etc. gives the query-shaped type for handlers and DTOs; let the query type, not a hand-written interface, describe output.

---

## 3. Drizzle-Kit Workflow (Migrations)

| Intent     | Command                     | When                                                     |
| ---------- | --------------------------- | -------------------------------------------------------- |
| Generate   | `pnpm drizzle-kit generate` | diff schema → SQL migration (works best with PostgreSQL) |
| Migrate    | `pnpm drizzle-kit migrate`  | apply generated migrations locally/dev                   |
| Push       | `pnpm drizzle-kit push`     | prototype/dev without migration files (dev DBs only)     |
| Introspect | `drizzle-kit introspect`    | seed schema from an existing database                    |

- **`drizzle.config.ts`** at the root wires `schema: "./src/db/schema.ts"`, `out: "./drizzle"`, `dialect`, and DB `url` from env — the config is the migration CLI's contract, commit it like the schema.
- **Generate → review SQL → migrate**; commit the migration files — they are the deploy artifact in CI.
- **`push` is for spikes/experiments, not shipped apps** — divergent schema without migrations is unrecoverable drift.
- **Naming**: bump `migrationsFolder` (default `./drizzle`), keep one migration per logical change, review the SQL for DDL you meant (indexes!, FKs, defaults).

---

## 4. Querying

- **`db.select()` is SQL-shaped** — columns, `from`, `where`, `orderBy`, `limit`, `offset` map 1:1 to SQL, keeping full control of shape and performance:

```ts
import { asc, eq, sql, desc } from 'drizzle-orm';

const rows = await db
  .select({ id: users.id, name: users.name })
  .from(users)
  .where(eq(users.email, email))
  .orderBy(asc(users.createdAt))
  .limit(10);
```

- **Relational queries for nested reads** — `db.query.users.findMany({ with: { posts: true } })` is the typed, N+1-free shortcut for typical API shapes:

```ts
const userWithPosts = await db.query.users.findFirst({
  where: eq(users.id, id),
  with: { posts: true },
});
```

- **`select` _slices_ what you return** — omit whole columns (large texts, blobs) unless needed; project to just what the consumer renders.
- **`sql\`\`` for SQL you can't express cleanly** (window functions, JSONB paths, CTEs) — `sql<number>\`${col}::int\`` keeps casting typed; the tag interpolates safely, never string-concatenate input.
- **Pagination: cursor (`where col < cursor`) + `limit` for deep lists; `offset/limit` only for small/shallow sets**.

---

## 5. Prepared Statements & Performance

- **Prepared statements for hot, repeatable queries** — `.prepare("name")` a repeatable query and call it with args; one parse, your DB caches the plan:

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

---

## 8. Seeding & Testing

- **Seed with plain scripts against the schema module** — `tsx src/db/seed.ts` building `insert(...).values([...])`; keep fixtures typed by `$inferInsert` so seeds can't drift from schema:

```ts
// src/db/seed.ts
const fixtureUsers: NewUser[] = [{ email: 'admin@example.com', name: 'Admin' }];
await db.insert(users).values(fixtureUsers);
```

- **Tests: SQLite in-memory (or a dedicated test DB)** — Drizzle supports multiple dialects, so unit-test the schema/relations against `sqlite`/`pg-mem` with the same schema module; use `migrate` or `push` to build the test schema.
- **Reset per suite** — truncate tables (`delete $ from ...`) in a beforeEach/afterEach, never accumulate across tests.
- **`batch`/`$queryRaw` for fast bulk fixture loading** in tests and migrations — one round-trip over per-row inserts.

---

## 9. General Rules of Thumb

- **Schema-as-code discipline** — the TS module _is_ the schema; migrate from it, never scissors-edit the DB directly.
- **Choose based on the query shape** — relational queries for nested reads, `select` builder for flat lists, `sql\`\`` for anything SQL-shaped; don't force one style.
- **Stay close to the DB** — Drizzle earns its value when you let the SQL show; if you want a framework hiding SQL, pick Prisma; if you want SQL with safety rails, Drizzle + tagged `sql` is the sweet spot.
- **Repository boundaries** — keep `schema.ts` + queries behind a data module so models don't cross layers untranslated; map driver errors at this seam.
- **Prepared statements and indexes on hot paths** — Drizzle gives you the control, so use it where it counts (see §4–5).

---

## Quick-Start Checklist

- [ ] Schema as a typed module (`pg-core`/`mysql-core`/`sqlite-core`/`d1`), `$inferSelect`/`$inferInsert` types exported
- [ ] Relations declared bidirectionally for `db.query` relational reads
- [ ] FKs with `onDelete` behaviour in the schema
- [ ] `drizzle.config.ts` + `drizzle-kit generate` → review → migrate; commits committed
- [ ] `select(...)` slices outputs; `sql\`\`` used for SQL-shaped needs
- [ ] Cursor pagination for deep lists; deterministic order
- [ ] Prepared statements for hot queries; indexes on predicates
- [ ] `db.transaction` for atomic writes; atomic `sql` expressions, no read-modify-write
- [ ] Driver error codes mapped to domain errors
- [ ] `onConflictDoUpdate` for idempotent writes
- [ ] Seed script + in-memory/test DB with resets
