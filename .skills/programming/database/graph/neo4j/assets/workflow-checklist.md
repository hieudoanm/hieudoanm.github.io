# neo4j: Workflow Checklist

A practical run sheet for applying [neo4j](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Nodes** represent entities; they can carry labels and key-value properties
- [ ] 1. Core Concepts: **Relationships** are first-class objects connecting exactly two nodes (direction + type) with their own properties
- [ ] 2. Cypher Query Patterns: Match patterns: MATCH (u:User)-[:PURCHASED]->(p:Product) WHERE p.price > 100 RETURN u.name
- [ ] 2. Cypher Query Patterns: Create/update: MERGE (create-or-match) vs CREATE; SET vs REMOVE for properties
- [ ] 3. Data Modeling: Think **use-case-first**: model the question as a graph pattern, not as a canonical schema
- [ ] 3. Data Modeling: Relationship properties can encode time, strength, or state; this is a strength over relational joins
- [ ] 4. Indexing and Constraints: Create indexes for properties used in WHERE / MATCH lookups
- [ ] 4. Indexing and Constraints: Use **composite indexes** for multi-field lookups; avoid creating one index per field blindly
- [ ] 5. Operations and Architecture: **Enterprise Edition** provides clustering, multi-database (named databases per instance), and causal clustering
- [ ] 5. Operations and Architecture: **Desktop Edition**: local development; runs as an embedded server with a browser-based Neo4j Browser

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
