# Prisma ORM Best Practices: 8. Seeding & Testing

## Source guidance

This example applies the **8. Seeding & Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Seed via `prisma/seed.ts` run by `prisma db seed`** — put reproducible fixtures behind a script, not ad-hoc scripts scattered in `src`:
- **Tests: a dedicated test database, reset per suite, never the dev DB** — migrate + truncate between suites; use `DATABASE_URL` swapping and a fixture factory, not prod data.
- **`createMany` for bulk inserts over per-row `create`** in migrations/imports/tests — one round-trip instead of N.

## Example

```ts
// prisma/seed.ts (config in package.json: "prisma": { "seed": "tsx prisma/seed.ts" })
const users = [
  { email: 'admin@example.com', name: 'Admin', role: 'ADMIN' },
  { email: 'user@example.com', name: 'User', role: 'USER' },
];
await prisma.user.createMany({ data: users });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for prisma-orm-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
