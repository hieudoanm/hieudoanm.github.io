# Workflow notes

Focused reference for **apache-iceberg-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Each commit creates a snapshot — atomic, isolated reads:**

```sql
INSERT INTO lake.orders VALUES (...);   -- snapshot → readers see consistent state
SELECT * FROM lake.orders FOR SYSTEM_TIME AS OF '<snapshot-id>';
```

- **`MERGE`/`COPY INTO` for upserts/Merged-final; `OVERWRITE` vs `MERGE` semantics differ — spot the intent.**
- **Idempotent writes: replace where the key says (no duplicate load when a job reruns).**
- **Concurrent writers handled by optimistic concurrency — commit retried by the writer protocol; design partitions so concurrent parts don't conflict.**

---

## 3. Partitioning & Data Layout

- **Transform-based partitioning: `days()`, `truncate(n)`, `bucket(n, col)` — not raw columns only:**
  - select `days()` for time-range filters, `bucket()` for high-cardinality keys.
- **Balanced: too few partitions = scan cost; too many = metadata churn.**
- **`files` below partitions bounded; compaction merges small files.**

---

## 4. Maintenance Tasks

- **Routine maintenance keeps "table health":**
