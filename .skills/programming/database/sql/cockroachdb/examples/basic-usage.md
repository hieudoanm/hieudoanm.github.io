# CockroachDB Best Practices: Basic Usage

Best practices for operating CockroachDB as a distributed, globally consistent SQL database. Use when designing schemas, writing distributed queries, planning multi-region deployments, or migrating from Postgres — covers serializable isolation, distributed transactions, retries, and region-aware design.

## Scenario

Use this example as a starting point when applying **cockroachdb** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
-- Distributed-friendly keys: UUID primary keys, no monotonic sequences
CREATE TABLE orders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region     STRING NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
