# Apache Trino Best Practices: 3. Joins & Performance Levers

## Source guidance

This example applies the **3. Joins & Performance Levers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Join style hints (`/*+ /* */` hints) where the planner mis-picks:**
- **Broadcast small tables (BROADCAST hint); bucketed joins on the join key with matching bucket count.**
- **`EXPLAIN` / `EXPLAIN (TYPE DISTRIBUTED)` before heavy queries — identify shuffle vs pushdown.**
- **Skew handled by salt/re-keying; `session` `max_workers_per_task` tuned by roadmaps.**

## Example

```sql
SELECT /*+ broadcast(b) */ a.*, b.name
FROM big_table a JOIN small_table b ON a.id = b.id;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apache-trino-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
