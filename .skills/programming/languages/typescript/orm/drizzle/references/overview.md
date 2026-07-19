# Overview

Focused reference for **drizzle-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
