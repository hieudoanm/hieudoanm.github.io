# Overview

Focused reference for **prisma-orm-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
