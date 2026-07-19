---
name: elasticsearch
description: Best practices for designing indexes, queries, and clusters with Elasticsearch (search and analytics). Use when writing mappings, building search queries/aggregations, tuning shards, planning migrations/re-indexing, or debugging slow searches — treats ES as a search engine, not a system of record.
---

# Elasticsearch Best Practices

Elasticsearch is a **search and analytics engine**, not a transactional database or source of truth — data is rebuilt from primary storage. Best practice is designing mappings before indexing, separating `text` from `keyword` deliberately, avoiding mapping explosions and wildcards on high-cardinality fields, controlling shards, and using `search_after` over deep `from+size` pagination.

---

## 1. Core Stack & Constraints

- Assume Elasticsearch **8.x** unless stated otherwise
- **Do not treat ES as a transactional database** — it is not the source of truth
- **Avoid dynamic mappings unless explicitly justified**
- Avoid storing **large unbounded fields** and excessive nested/parent-child mappings
- **Prefer explicit index templates**
- **Avoid wildcard queries on high-cardinality fields**; use `keyword` for filtering/aggregation
- Be explicit about **refresh intervals** when relevant

```json
{
  "mappings": {
    "properties": {
      "title":   { "type": "text" },
      "status":  { "type": "keyword" },
      "price":   { "type": "double" },
      "created": { "type": "date" }
    }
  }
}
```

---

## 2. Indexing & Data Modeling

- **Design mappings before indexing data**
- **Separate `text` vs `keyword` intentionally** — `text` analyzed for full-text; `keyword` exact for filters/aggregations/scripts
- Use **analyzers appropriate to language and use case**
- **Avoid mapping explosions** (unbounded field names from dynamic keys)
- **Prefer denormalization over joins** (parent/child is expensive)
- **Control index and shard count deliberately** (target big shards, not many small ones)
- Use **index aliases for versioning**; plan **re-indexing as a normal operation**

---

## 3. Safety & Data Integrity

- **Assume data can be rebuilt from primary storage**
- Avoid destructive operations without warnings: **index deletion, reindex with overwrite**
- Be explicit about **update vs upsert** behavior
- **Avoid scripts unless necessary**; treat **cluster-level operations as high risk**

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

- **Search engine, not store** — treat ES as disposable and rebuildable
- **Mapping is the schema** — design it before data flows in; keep field names bounded
- **text vs keyword decides correctness** of filters and full-text — choose per field
- **Reference: search_after, not deep offsets** — memory and stability follow

---

## Quick-Start Checklist

- [ ] Mappings designed before indexing; index templates in place
- [ ] text vs keyword chosen per field; analyzers language-appropriate
- [ ] No dynamic mapping explosions; no excessive nesting
- [ ] Denormalized model; no join-heavy parent-child patterns
- [ ] Implicit aliases + planned re-indexing; refresh intervals explicit
- [ ] Pagination via `search_after`; no deep `from+size`
- [ ] Aggregation cardinality bounded; shard count tuned (no over-sharding)
- [ ] Heap/circuit breakers monitored; rebuildable-from-source assumption held