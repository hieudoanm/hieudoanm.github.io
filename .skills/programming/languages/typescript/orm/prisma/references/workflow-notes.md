# Workflow notes

Focused reference for **prisma-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
