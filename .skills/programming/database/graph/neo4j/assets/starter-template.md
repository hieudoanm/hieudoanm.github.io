# Neo4J: Starter Template

A reusable starting point derived from the **2. Cypher Query Patterns** section of [Neo4J](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
