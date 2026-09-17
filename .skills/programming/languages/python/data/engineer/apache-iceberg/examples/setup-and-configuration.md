# Apache Iceberg Best Practices: 2. Writes & Snapshots

## Source guidance

This example applies the **2. Writes & Snapshots** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Each commit creates a snapshot — atomic, isolated reads:**
- **`MERGE`/`COPY INTO` for upserts/Merged-final; `OVERWRITE` vs `MERGE` semantics differ — spot the intent.**
- **Idempotent writes: replace where the key says (no duplicate load when a job reruns).**
- **Concurrent writers handled by optimistic concurrency — commit retried by the writer protocol; design partitions so concurrent parts don't conflict.**

## Example

```sql
INSERT INTO lake.orders VALUES (...);   -- snapshot → readers see consistent state
SELECT * FROM lake.orders FOR SYSTEM_TIME AS OF '<snapshot-id>';
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-iceberg-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
