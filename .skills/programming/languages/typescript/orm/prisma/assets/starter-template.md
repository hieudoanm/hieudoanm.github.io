# Prisma ORM Best Practices: Starter Template

A reusable starting point derived from the **1. Setup & Generation** section of [Prisma ORM Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
