# 2. Access Patterns

Focused reference for **couchbase**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Access Patterns

- **Key-value** operations (get/set/upsert) for single-document access: the lowest latency path, consistent with the memory-first design.
- **N1QL queries** for analytical or ad-hoc lookups; require a primary or secondary index to be efficient.
- **Full-text search (FTL)** via index/query (built on FTS) for fuzzy, language-aware search.
- **Subdocument operations** to mutate parts of a document without fetching the whole JSON.
- **Durability**: wait for persistence or replication with `MutationResult.durability` in SDKs.

```sql
-- scope + collection keeps the query on one indexed path
SELECT META(c).id, c.name, c.total
FROM `my_bucket`.`store`.`orders` AS c
WHERE c.status = "paid" AND c.createdAt > $since
ORDER BY c.createdAt DESC
LIMIT 50;
```
