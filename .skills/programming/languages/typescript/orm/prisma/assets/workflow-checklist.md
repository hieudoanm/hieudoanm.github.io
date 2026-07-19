# Prisma ORM Best Practices: Workflow Checklist

A practical run sheet for applying [Prisma ORM Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup & Generation: **prisma init scaffolds schema + .env; commit the schema, gitignore the generated client** — the client is regenerated (prisma generate) on install/build, not checked in
- [ ] 1. Setup & Generation: **Run prisma generate as a postinstall step** — the typed client is a dependency of your build, not a manual ceremony
- [ ] 2. Schema Modeling: **PascalCase model names, camelCase fields, singular model = plural table** — model User { posts Post[] } maps to a users table automatically; override with @@map for legacy/naming-convention tables
- [ ] 2. Schema Modeling: **Every model gets a primary key; prefer id String @id @default(cuid())/uuid()** over auto-increment Int @id for distributions and import/merge safety
- [ ] 4. Querying (Client Usage): **select — take only what you use.** Defaulting to full models pulls columns the app never reads and defeats DB optimizations:
- [ ] 4. Querying (Client Usage): **include only relations you render** — it's the curated N+1 fix (see §7); don't blanket-include
- [ ] 5. Transactions & Concurrency: **Interactive transactions for multi-step operations that must commit atomically** ($transaction(async (tx) => {...})) — the async body runs in one tx; throw to roll back:
- [ ] 5. Transactions & Concurrency: **Atomic field mutations over read-modify-write** — { increment, decrement, set } updates run server-side; never fetch-then-write for counters/balances (the classic race)
- [ ] 6. Errors & Edge Cases: **Prisma.PrismaClientKnownRequestError has a stable code** — the P-codes (P2002 unique, P2025 not found) let you map failures to HTTP/user errors exactly:
- [ ] 6. Errors & Edge Cases: **Map the common codes once** (P2002 unique constraint, P2003 FK violated, P2025 record to operate on missing, P2014 relation violation) into typed domain errors at the repository layer

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
