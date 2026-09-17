# Prisma ORM Best Practices: Basic Usage

Best practices for building database layers with Prisma (TypeScript). Use when creating, structuring, or reviewing a Prisma schema, migrations, or client queries — covers schema design, relations, migration workflow, querying, performance, transactions, and seeding.

## Scenario

Use this example as a starting point when applying **prisma-orm-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup & Generation** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
