# Drizzle ORM Best Practices: Basic Usage

Best practices for building database layers with Drizzle ORM (TypeScript). Use when creating, structuring, or reviewing a Drizzle schema, migrations, or queries — covers schema/relations, drizzle-kit workflow, relational queries, raw SQL, transactions, and testing.

## Scenario

Use this example as a starting point when applying **drizzle-orm-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup & Schema as Code** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
