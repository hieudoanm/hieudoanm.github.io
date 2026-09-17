# 2. Cypher Query Patterns

Focused reference for **neo4j**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Cypher Query Patterns

- Match patterns: `MATCH (u:User)-[:PURCHASED]->(p:Product) WHERE p.price > 100 RETURN u.name`.
- Create/update: `MERGE` (create-or-match) vs `CREATE`; `SET` vs `REMOVE` for properties.
- Aggregation: `COUNT`, `COLLECT`, `SUM`, `AVG` over `WITH`/`UNWIND` — always wrap aggregate-only queries.
- Index lookups: `CREATE INDEX FOR (u:User) ON (u.email)`; Cypher picks the best index automatically.
- `PROFILE` / `EXPLAIN` to inspect query plans and check index usage.

```cypher
// shape the question as a pattern, then let the graph answer it
MATCH (u:User {email: $email})-[r:PURCHASED]->(p:Product)
WHERE r.purchasedAt > datetime() - duration('P90D')
RETURN p.name, p.price, r.quantity
ORDER BY p.price DESC
LIMIT 20;
```

```cypher
// MERGE is idempotent: safe to replay on an append-style job
MERGE (u:User {id: $userId})
  ON CREATE SET u.createdAt = timestamp()
SET u.lastSeenAt = timestamp()
WITH u
MATCH (p:Product {sku: $sku})
MERGE (u)-[r:PURCHASED {sku: $sku}]->(p)
  ON CREATE SET r.purchasedAt = timestamp()
RETURN elementId(r) AS purchaseId;
```
