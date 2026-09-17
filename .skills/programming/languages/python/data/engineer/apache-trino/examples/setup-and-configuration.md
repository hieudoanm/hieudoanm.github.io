# Apache Trino Best Practices: 1. Catalog & Schema Model

## Source guidance

This example applies the **1. Catalog & Schema Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`catalog.schema.table` — every table fully qualified; multiple catalogs joined in one query:**
- **Default catalog/schema set per-connection for readability — but the qualified form travels.**
- **Connector documents its semantics (Iceberg snapshots, Postgres pushdown limits) — know your source's lever.**

## Example

This excerpt is from the cited **1. Catalog & Schema Model** section.

```sql
SELECT u.id, e.amount
FROM warehouse.events e
JOIN postgres.public.users u ON u.id = e.user_id
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-trino-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
