# PostgreSQL Best Practices: 4. Reliability & Performance

## Source guidance

This example applies the **4. Reliability & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Index based on real queries** — not guesses
- **Avoid over-indexing write-heavy tables** (every index costs writes)
- Use `EXPLAIN (ANALYZE, BUFFERS)` when optimizing; read `Seq Scan` vs `Index Scan`
- Be explicit about **pagination**; avoid unbounded result sets (keyset over OFFSET at scale)
- Know index types: **btree** (default), **gin** (arrays/JSONB), **gist/brin** (ranges, large tables)
- Consider **caching vs indexing** trade-offs and read/write ratios

## Example

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE user_id = $1 AND status = 'paid';
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for postgresql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
