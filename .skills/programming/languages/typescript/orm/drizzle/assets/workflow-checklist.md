# Drizzle ORM Best Practices: Workflow Checklist

A practical run sheet for applying [Drizzle ORM Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup & Schema as Code: **Schema is ordinary TypeScript** (drizzle-orm/pg-core / mysql-core / sqlite-core / d1) — export the table builders and the inferred $inferSelect/$inferInsert types; the DB and the code can't drift
- [ ] 1. Setup & Schema as Code: **Column names in DB vs TS names** — pgTable accepts a name: text("full_name") with mapTo("fullName") maps backend columns to camelCase fields (mirrors Prisma's @map without the DSL)
- [ ] 2. Relations & Type Safety: **Declare relations bidirectionally** — one/many in a relations export wired with fields/references; the _relational_ API (db.query.users.findMany) reads these for typed nested loading
- [ ] 2. Relations & Type Safety: **Foreign keys explicitly** — .references(() => table.column, { onDelete: "cascade" | "set null" }) so delete behaviour is in the schema, not improvised per query
- [ ] 4. Querying: **db.select() is SQL-shaped** — columns, from, where, orderBy, limit, offset map 1:1 to SQL, keeping full control of shape and performance:
- [ ] 4. Querying: **Relational queries for nested reads** — db.query.users.findMany({ with: { posts: true } }) is the typed, N+1-free shortcut for typical API shapes:
- [ ] 5. Prepared Statements & Performance: **Prepared statements for hot, repeatable queries** — .prepare("name") a repeatable query and call it with args; one parse, your DB caches the plan:
- [ ] 5. Prepared Statements & Performance: **$queryRaw is _not_ the escape hatch it is in other ORMs — it's a first-class tool**; use tagged sql\\`` freely for aggregates, JSON columns, and reporting where the builder reads worse than SQL
- [ ] 6. Transactions & Batchs: **db.transaction(async (tx) => {...})** wraps INSERT/UPDATEs atomically — never mix them with external network calls; keep the tx short and indexed-friendly:
- [ ] 6. Transactions & Batchs: **Atomic updates with sql\\` expressions over read-modify-write** — set({ balance: sql\${t.balance} - ${amt}\`) handles concurrency server-side, no lost updates

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
