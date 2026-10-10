# Neo4J: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Using `MERGE` on every write causing merge collisions under concurrency; prefer `CREATE` when you know the node/relationship is unique.
- Modeling the graph like a relational database (many-to-many without relationships).
- Forgetting to add `MATCH` filters before `MERGE` paths, leading to Cartesian explosion.
- Not using `EXPLAIN`/`PROFILE` on production queries.

## Example

A team applying **6. Common Pitfalls** to a Neo4J project treats this guidance as a review gate. It checks whether the current implementation satisfies **Using `MERGE` on every write causing merge collisions under concurrency; prefer `CREATE` when you know the node/relationship is unique.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for neo4j.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
