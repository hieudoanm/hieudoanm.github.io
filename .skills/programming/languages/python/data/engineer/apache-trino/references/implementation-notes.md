# Implementation notes

Focused reference for **apache-trino-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Bucketing & Table Design

- **Bucketing pays on join keys; choose bucket count ≈ task parallelism:**

```sql
CREATE TABLE warehouse.orders
WITH (format='PARQUET', partitioned_by=ARRAY['dt'])
AS SELECT ...;
```

- **Partition by the filter-common dimension (`dt`), bucket by join keys.**
- **Parquet/ORC for scanning; `columnar` via connectors async — keep compaction reasonable.**

---

## 5. Resource Management

- **Resource groups/CGO provide fair execution — tag workloads (`SET SESSION resource_group`?) and bound concurrency:**

```
-- coordinator: resource groups cap concurrent queries per tenant/pipeline
```

- **Query timeouts + mem limits (`query.max-memory`, `query.max-total-memory-per-node`).**
- **`EXPLAIN (TYPE TIMINGS)` traces scheduling/execution hotspots; right-size `task.writer-count`.**
- **Keep coordinator lean (don't run heavy LS on it); separations per-tenant trusted.**
