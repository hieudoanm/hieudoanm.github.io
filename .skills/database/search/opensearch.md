---
name: opensearch
description: Best practices for designing indexes, queries, and operations with OpenSearch (search and analytics). Use when writing mappings, building queries/aggregations, configuring Index State Management, tuning shards, or planning upgrades — covers the security plugin, ISM, snapshots, and cluster stability.
---

# OpenSearch Best Practices

OpenSearch is a **search and analytics platform**, not a system of record. Best practice is operationally aware design: mappings before indexing, `text` vs `keyword` separated deliberately, controlled dynamic mappings, the security plugin enabled with least-privilege roles, ISM for lifecycle, and `search_after` over deep pagination.

---

## 1. Core Stack & Constraints

- Assume OpenSearch **2.x** unless specified
- **Do not use OpenSearch as a transactional database**
- **Avoid uncontrolled dynamic mappings**; avoid excessive nested/parent-child relationships
- **Prefer explicit index templates**
- **Avoid wildcard queries on high-cardinality fields**; use `keyword` for filters/aggregations
- Be explicit about **refresh intervals and replicas**
- **Treat cluster-level settings as high risk**

```json
{
  "index_patterns": ["logs-*"],
  "template": {
    "mappings": {
      "properties": {
        "message": { "type": "text" },
        "level": { "type": "keyword" },
        "@ts": { "type": "date" }
      }
    }
  }
}
```

---

## 2. Indexing & Data Modeling

- **Design mappings before indexing data**
- **Separate `text` and `keyword` intentionally**; choose analyzers per language/behavior
- **Avoid mapping explosions** from unbounded field names
- **Prefer denormalization over joins**
- **Control shard count deliberately**; use **index aliases for versioning and migrations**
- **Plan re-indexing as a normal lifecycle operation**

---

## 3. Security & Governance

- **Enable and configure the OpenSearch Security plugin**
- Use **least-privilege roles**; **separate read, write, and admin permissions**
- **Never expose cluster-admin credentials to applications**
- **Audit destructive operations**; protect **snapshot repositories**
- Treat **index deletion and close operations as dangerous**

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

- **Platform, not store** — treat indexes as rebuildable from primary sources
- **Security is on by default, not an afterthought** — roles least-privilege, perms separate
- **Bounded and deliberate** — mappings, shards, aggregations, and pagination all controlled
- **Operations are part of design** — ISM, snapshots, and rollover are normal ops

---

## Quick-Start Checklist

- [ ] Mappings before indexing; index templates explicit; aliases for versioning
- [ ] text vs keyword chosen per field; dynamic mappings controlled
- [ ] Denormalized model; no join-heavy patterns
- [ ] Security plugin enabled; least-privilege roles; read/write/admin separated
- [ ] Destructive ops audited; snapshot repositories protected
- [ ] `search_after` for deep pagination; no deep `from+size`
- [ ] Shards sized deliberately; aggregations bounded; heap/GC/circuit breakers monitored
- [ ] ISM lifecycle defined; re-indexing/upgrades planned; realistic load testing
