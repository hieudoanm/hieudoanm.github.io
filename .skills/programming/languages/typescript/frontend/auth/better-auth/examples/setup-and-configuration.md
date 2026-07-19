# Better Auth Best Practices: 2. Database & Adapters

## Source guidance

This example applies the **2. Database & Adapters** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Setup the adapter + schema (Prisma/Drizzle/Kysely):**
- **Run schema migrations (`better-auth` will surface the generated schema); sessions/users/tokens tables versioned.**
- **Conditional adapters documented by engine (sqlite/postgres) — behavior parity checked.**

## Example

```ts
import { prismaAdapter } from "better-auth/adapters/prisma";
database: prismaAdapter(prisma, { provider: "postgresql" })
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for better-auth-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
