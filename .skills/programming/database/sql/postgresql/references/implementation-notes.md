# Implementation notes

Focused reference for **postgresql**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Reliability & Performance

- **Index based on real queries** — not guesses
- **Avoid over-indexing write-heavy tables** (every index costs writes)
- Use `EXPLAIN (ANALYZE, BUFFERS)` when optimizing; read `Seq Scan` vs `Index Scan`
- Be explicit about **pagination**; avoid unbounded result sets (keyset over OFFSET at scale)
- Know index types: **btree** (default), **gin** (arrays/JSONB), **gist/brin** (ranges, large tables)
- Consider **caching vs indexing** trade-offs and read/write ratios

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE user_id = $1 AND status = 'paid';
```

---

## 5. Security

- Parameterized queries against SQL injection — **always**
- Least-privilege roles; separate read/write users
- Never log or store secrets in plaintext; use column/database encryption as required
- Restrict production access; review grants and extension usage
