# neo4j: Basic Usage

Neo4j — native graph database using Cypher query language, property graph model, and index-free adjacency.

## Scenario

Use this example as a starting point when applying **neo4j** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Cypher Query Patterns** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```cypher
// shape the question as a pattern, then let the graph answer it
MATCH (u:User {email: $email})-[r:PURCHASED]->(p:Product)
WHERE r.purchasedAt > datetime() - duration('P90D')
RETURN p.name, p.price, r.quantity
ORDER BY p.price DESC
LIMIT 20;
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
