# Overview

Focused reference for **elasticsearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
