# MongoDB Best Practices: 4. Reliability & Performance

## Scenario

A project is working on **4. reliability & performance** for MongoDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Index all frequently queried fields**; understand index selectivity
- Monitor **slow queries and query plans** (`db.currentOp`, profiler)
- **Avoid N+1 query patterns** (batch reads, aggregation)
- Use **safe pagination** — bounded `skip` or stable keys, not unbounded skips
- **Plan shard keys before scaling** (high-cardinality, evenly distributed, no monotonic hotspot)
- Test aggregation pipelines with **realistic data volumes**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Performance** section of [SKILL.md](../SKILL.md).
