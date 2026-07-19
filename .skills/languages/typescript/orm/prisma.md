---
name: prisma-orm-design
description: Best practices for building database layers with Prisma (TypeScript). Use when creating, structuring, or reviewing a Prisma schema, migrations, or client queries — covers schema design, relations, migration workflow, querying, performance, transactions, and seeding.
---

# Prisma ORM Best Practices

Prisma turns your database schema into a typed query client: the `schema.prisma` is the single source of truth, and the generated client gives you type-safe CRUD and relations for free. Best practice here is about keeping that schema the _only_ place the data shape lives (generating, never hand-writing clients), modeling relations deliberately, and avoiding the classic foot-guns — N+1 queries, missing `select`, un-indexed filters, and fat transactions.

---

## 1. Setup & Generation

```prisma
// prisma/schema.prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"   // postgresql | mysql | sqlite | mongodb
    url      = env("DATABASE_URL")
}
```

- **`prisma init` scaffolds schema + `.env`; commit the schema, gitignore the generated client** — the client is regenerated (`prisma generate`) on install/build, not checked in.
- **Run `prisma generate` as a `postinstall` step** — the typed client is a dependency of your build, not a manual ceremony.
- **One Prisma client per application boundary**; larger services share a single `PrismaClient` singleton rather than instantiating per request (see §5).
- **Name your client for clarity** (`prisma generate --generator` naming) and import the generated types (`@prisma/client`) directly — the return types of queries are the schema's type story.

```bash
pnpm add prisma @prisma/client
pnpm prisma init --datasource-provider postgresql
pnpm prisma generate      # regenerates after every schema change
```

---

## 2. Schema Modeling

- **PascalCase model names, camelCase fields, singular model = plural table** — `model User { posts Post[] }` maps to a `users` table automatically; override with `@@map` for legacy/naming-convention tables.
- **Every model gets a primary key; prefer `id String @id @default(cuid())`/`uuid()`** over auto-increment `Int` `@id` for distributions and import/merge safety.
- **Enums over string columns** for closed sets — `enum Role { ADMIN USER }` gives typed, validated values in the client.

```prisma
model User {
    id        String   @id @default(cuid())
    email     String   @unique
    name      String
    role      Role     @default(USER)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    posts     Post[]
    @@map("users")
}
```

- **Index what you filter/sort/join** — `@@index([email])`, `@@index([tenantId, createdAt])`; Prisma won't index lazily, so composite indexes on the query patterns your app actually runs.
- **Add `@updatedAt` fields and audit timestamps** (`createdAt`/`updatedAt`) once, reuse everywhere.
- **`Decimal`/`BigInt` for money-correct amounts** (Postgres/Mongo scaling notes apply), never `Float`; use `DateTime` timezone-aware where supported.

---

## 3. Migrations Workflow

- Three commands, three intents:

| Intent           | Command                 | When                                                             |
| ---------------- | ----------------------- | ---------------------------------------------------------------- |
| Develop          | `prisma migrate dev`    | local schema edits — generates SQL, applies, re-generates client |
| Deploy           | `prisma migrate deploy` | CI/staging/prod — applies existing migrations only, no drift     |
| Reset (dev only) | `prisma migrate reset`  | wipes + re-applies from scratch on a dev DB                      |

- **Never hand-write migrations during normal dev — edit the schema and let `migrate dev` generate SQL**; review the generated migration file before applying.
- **Commit migrations** (`prisma/migrations/`) — they are the deployment artifact; `migrate deploy` in CI is the only promotion path.
- **`prisma db push` only for prototyping / no-migration setups** (SQLite studo work, spikes) — never for a shipped product's path to production.
- **Protect `DATABASE_URL`** — env-only, one per environment; never in the schema or committed files. Use `prisma migrate deploy --preview-feature`? (no — that's the prereq flag for newer approaches; keep it plain) — standard flags only.

---

## 4. Querying (Client Usage)

- **`select` — take only what you use.** Defaulting to full models pulls columns the app never reads and defeats DB optimizations:

```ts
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, name: true, role: true },
});
```

- **`include` only relations you render** — it's the curated N+1 fix (see §7); don't blanket-include.
- **Prefer `findUnique` where a unique constraint exists** (`findById` style) over `findFirst` — the query planner and error results are precise.
- **Pagination: cursor-based for deep lists** (`cursor` + `take` + `skip`), not `skip/take` alone on large tables; pair with `orderBy` deterministically.

```ts
const page = await prisma.post.findMany({
  take: 10,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { createdAt: 'desc' },
});
```

- **Use `count` for existence/number checks, not full fetches** — `prisma.user.count({ where: { role: "ADMIN" } })`.
- **Always `orderBy` where order matters** — Prisma doesn't promise insertion order.

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

- **N+1 lives in `include` and per-row queries** — batch with `include`/relation loading, or group by key (`Promise.all` + `findUnique` on ids) instead of a query per parent row.
- **Use `select` to trim payloads** (see §4) and **`raw` queries for hot/reporting paths** where the client abstraction's JOIN/shape control is insufficient — `prisma.$queryRaw\`...\`` keeps parameter binding safe.
- **Index the predicates** (schema §2) — `where` on un-indexed columns is a table scan masquerading as an API.
- **Set connection limits/timeouts to match the pool** (`connection_limit`) and keep transactions short (§5) so the pool doesn't starve.
- **Log/slow-query instrumentation (`candidateInterceptors`/client middleware) in prod to find the 1% queries** — profile before micro-optimizing.

---

## 8. Seeding & Testing

- **Seed via `prisma/seed.ts` run by `prisma db seed`** — put reproducible fixtures behind a script, not ad-hoc scripts scattered in `src`:

```ts
// prisma/seed.ts (config in package.json: "prisma": { "seed": "tsx prisma/seed.ts" })
const users = [
  { email: 'admin@example.com', name: 'Admin', role: 'ADMIN' },
  { email: 'user@example.com', name: 'User', role: 'USER' },
];
await prisma.user.createMany({ data: users });
```

- **Tests: a dedicated test database, reset per suite, never the dev DB** — migrate + truncate between suites; use `DATABASE_URL` swapping and a fixture factory, not prod data.
- **`createMany` for bulk inserts over per-row `create`** in migrations/imports/tests — one round-trip instead of N.

---

## 9. General Rules of Thumb

- **Schema-first discipline** — edit `schema.prisma`, generate, then code; never drift between an edited DB and an un-generated client.
- **Typed queries over string SQL** wherever the client covers the shape — `$queryRaw` is the escape hatch, not the default.
- **One idea per migration; review generated SQL** — a migration that touches `auth`, `billing`, and `profiles` is three migrations waiting to burn you.
- **Repositories wrap Prisma so models don't cross the layer untranslated** — map Prisma records to domain types at the boundary and translate errors (§6).
- **Favour the JSON feature-set that matches your DB** — Postgres JSONB queries via `path` operators stay typed-ish without denormalizing prematurely.

---

## Quick-Start Checklist

- [ ] `schema.prisma` is the single source of truth; `generate` on install
- [ ] `cuid()`/`uuid()` ids, `@updatedAt`, enums for closed sets
- [ ] `@@index` on every filtered/sorted/joined column pattern
- [ ] `migrate dev` locally, `migrate deploy` in CI, migrations committed
- [ ] `select` trimmed to used fields; `include` curated (no blanket includes)
- [ ] Cursor pagination for deep lists, deterministic `orderBy`
- [ ] Interactive `$transaction` for atomic multi-step writes; atomic `increment`/`decrement`
- [ ] Shared `PrismaClient` singleton; transactions kept short
- [ ] Prisma `P-code` errors mapped to domain errors at the repository layer
- [ ] N+1 avoided via `include`/batching; `$queryRaw` reserved for hot paths
- [ ] Seed script + isolated test database
