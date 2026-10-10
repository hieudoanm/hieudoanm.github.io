# neo4j: Validation Plan

Use this plan to verify work guided by [neo4j](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Using MERGE on every write causing merge collisions under concurrency; prefer CREATE when you know the node/relationship is unique
- [ ] Modeling the graph like a relational database (many-to-many without relationships)
- [ ] Forgetting to add MATCH filters before MERGE paths, leading to Cartesian explosion
- [ ] Not using EXPLAIN/PROFILE on production queries

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
