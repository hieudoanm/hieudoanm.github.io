# Implementation notes

Focused reference for **opensearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Performance & Reliability

- **Avoid deep pagination with `from + size`** — prefer **`search_after`/scroll** for large result sets
- **Limit aggregation cardinality**
- **Avoid over-sharding**; tune shard size for data volume
- **Monitor JVM heap, GC, and circuit breakers**
- Test queries with **realistic data sizes**; explain query cost and cluster impact
- Use **ISM** to manage index lifecycle (rollover, deletion, snapshots)

```json
{
  "query": { "match": { "message": "compile error" } },
  "search_after": ["1690000000000"]
}
```

---

## 5. General Rules of Thumb
