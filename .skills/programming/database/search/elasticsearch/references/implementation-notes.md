# Implementation notes

Focused reference for **elasticsearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Performance & Reliability

- **Design queries to limit scanned documents**
- **Avoid deep pagination with `from + size`** — prefer **`search_after`** (or PIT) for deep paging
- **Limit aggregation cardinality** (`terms` on high-cardinality fields is memory-heavy)
- **Tune shard count for index size — avoid over-sharding**
- Monitor **heap usage and circuit breakers**; watch slow queries

```json
{
  "query": { "bool": { "must": { "match": { "title": "postgres" } },
                        "filter": { "term": { "status": "published" } } } },
  "search_after": [ "1700000000000" ]
}
```

---

## 5. General Rules of Thumb
