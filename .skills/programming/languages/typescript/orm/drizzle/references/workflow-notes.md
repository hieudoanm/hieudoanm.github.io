# Workflow notes

Focused reference for **drizzle-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
