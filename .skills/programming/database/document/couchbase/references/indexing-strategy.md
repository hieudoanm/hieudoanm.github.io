# 3. Indexing Strategy

Focused reference for **couchbase**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Indexing Strategy

- Create **secondary indexes** on the fields you filter/order by.
- **Defer the primary index** on large buckets — it is only needed as a fallback for full scans.
- Use **covering indexes** with `USING GSI` and `INDEX_ADVISOR` `EXPLAIN` to verify index usage.
- Name indexes meaningfully and drop unused ones; index memory costs real RAM.
