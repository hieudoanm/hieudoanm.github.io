# Review checklist

Focused reference for **prisma-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
