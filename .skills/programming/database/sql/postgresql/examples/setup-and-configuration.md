# PostgreSQL Best Practices: 2. Data Modeling & Architecture

## Source guidance

This example applies the **2. Data Modeling & Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Normalize by default; denormalize intentionally**
- Choose correct types: `uuid`, `timestamptz`, `numeric` — not oversized text
- Use constraints: `NOT NULL`, `UNIQUE`, `CHECK`
- **Database-enforced integrity over app-only checks** (FKs, constraints)
- Design schemas around **query patterns**, not entities alone
- **Avoid premature partitioning** — partition when row counts and retention demand it
- Version migrations explicitly; treat schema changes as **operational events**

## Example

```sql
CREATE TABLE orders (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id),
  total       numeric(12,2) NOT NULL CHECK (total >= 0),
  status      text NOT NULL CHECK (status IN ('pending','paid','refunded')),
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for postgresql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
