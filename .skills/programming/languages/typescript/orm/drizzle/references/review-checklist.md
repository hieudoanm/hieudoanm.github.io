# Review checklist

Focused reference for **drizzle-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
