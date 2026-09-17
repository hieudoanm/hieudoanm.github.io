# Drizzle ORM Best Practices: 1. Setup & Schema as Code

## Source guidance

This example applies the **1. Setup & Schema as Code** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Schema is ordinary TypeScript** (`drizzle-orm/pg-core` / `mysql-core` / `sqlite-core` / `d1`) — export the table builders and the inferred `$inferSelect`/`$inferInsert` types; the DB and the code can't drift.
- **Column names in DB vs TS names** — `pgTable` accepts a name: `text("full_name")` with `mapTo("fullName")` maps backend columns to camelCase fields (mirrors Prisma's `@map` without the DSL).
- **`$inferSelect` once, derive everywhere** — export the row type and import it; don't re-declare shapes that the schema already types.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for drizzle-orm-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
