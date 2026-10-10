# Prisma ORM Best Practices: 2. Schema Modeling

## Source guidance

This example applies the **2. Schema Modeling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **PascalCase model names, camelCase fields, singular model = plural table** — `model User { posts Post[] }` maps to a `users` table automatically; override with `@@map` for legacy/naming-convention tables.
- **Every model gets a primary key; prefer `id String @id @default(cuid())`/`uuid()`** over auto-increment `Int` `@id` for distributions and import/merge safety.
- **Enums over string columns** for closed sets — `enum Role { ADMIN USER }` gives typed, validated values in the client.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for prisma-orm-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
