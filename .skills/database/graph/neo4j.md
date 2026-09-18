---
name: neo4j
description: Neo4j — native graph database using Cypher query language, property graph model, and index-free adjacency.
---

Neo4j is a **property graph database** built on the principle of **index-free adjacency**, where nodes, relationships, and properties form a first-class graph structure queried with the **Cypher** language.

## 1. Core Concepts

- **Nodes** represent entities; they can carry labels and key-value properties.
- **Relationships** are first-class objects connecting exactly two nodes (direction + type) with their own properties.
- **Labels** categorize nodes (e.g., `:User`, `:Product`); indexes are built per label and property.
- **Cypher** is a declarative, pattern-matching query language; queries read as ASCII-art graph patterns.
- **Schema**: optional, enforced via **constraints** (`UNIQUE`, `NOT NULL`, `EXISTS`) and **indexes**; you can start without a schema.

## 2. Cypher Query Patterns

- Match patterns: `MATCH (u:User)-[:PURCHASED]->(p:Product) WHERE p.price > 100 RETURN u.name`.
- Create/update: `MERGE` (create-or-match) vs `CREATE`; `SET` vs `REMOVE` for properties.
- Aggregation: `COUNT`, `COLLECT`, `SUM`, `AVG` over `WITH`/`UNWIND` — always wrap aggregate-only queries.
- Index lookups: `CREATE INDEX FOR (u:User) ON (u.email)`; Cypher picks the best index automatically.
- `PROFILE` / `EXPLAIN` to inspect query plans and check index usage.

## 3. Data Modeling

- Think **use-case-first**: model the question as a graph pattern, not as a canonical schema.
- Relationship properties can encode time, strength, or state; this is a strength over relational joins.
- Avoid deeply nested node trees; flatten where relationships are stable and traversal is frequent.
- Use **variable-length paths** (e.g., `[:FRIEND*1..5]`) sparingly — they can blow up exponentially without `MATCH` filters.

## 4. Indexing and Constraints

- Create indexes for properties used in `WHERE` / `MATCH` lookups.
- Use **composite indexes** for multi-field lookups; avoid creating one index per field blindly.
- Use `CREATE CONSTRAINT` for uniqueness and existence requirements.
- Check `CALL db.indexes()` for unused indexes; remove them to reduce overhead.

## 5. Operations and Architecture

- **Enterprise Edition** provides clustering, multi-database (named databases per instance), and causal clustering.
- **Desktop Edition**: local development; runs as an embedded server with a browser-based Neo4j Browser.
- **Cloud**: Neo4j Aura offers fully managed SaaS.
- Memory: set `dbms.memory.heap.initial_size` and `dbms.memory.pagecache.size` to fit the active working set.
- Backups via `neo4j-admin database dump/backup`; use online backups for production.
- Monitor via Neo4j Browser, JMX, or APM integrations.

## 6. Common Pitfalls

- Using `MERGE` on every write causing merge collisions under concurrency; prefer `CREATE` when you know the node/relationship is unique.
- Modeling the graph like a relational database (many-to-many without relationships).
- Forgetting to add `MATCH` filters before `MERGE` paths, leading to Cartesian explosion.
- Not using `EXPLAIN`/`PROFILE` on production queries.

## General Rules of Thumb

- Model each important business question as a graph pattern first, then design the graph schema to answer it.
- Use `MERGE` for idempotent writes, `CREATE` for append-only events.
- Index every property used in `WHERE` and path-matching filters.
- Keep traversals shallow when possible; use path-length limits on variable-length patterns.

## Quick-Start Checklist

- [ ] Design the graph schema around your core query patterns.
- [ ] Create indexes and constraints before loading production data.
- [ ] Use `PROFILE`/`EXPLAIN` to validate query plans.
- [ ] Right-size heap and pagecache to the working set.
- [ ] Set up monitoring for query performance and relationship counts.
- [ ] Schedule regular online backups and test restoration.
- [ ] Prefer `MERGE` for idempotent writes; `CREATE` for append-only events.