# Apache Kafka Best Practices: 4. Performance & Operations

## Scenario

A project is working on **4. performance & operations** for Apache Kafka Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Balance partition count vs throughput** (partitions = parallelism; too many = overhead)
- **Monitor consumer lag continuously** (should trend to ~0, not grow unbounded)
- **Avoid hot partitions** — skew in keys causes single-partition hotspots
- **Tune batch size and linger appropriately** (batch = throughput, linger = latency)
- **Monitor disk usage and retention impact**
- **Plan for broker failures** (replicas, ISR, `min.insync.replicas`)
- **Test rebalance behavior** (consumer group joins/leaves)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance & Operations** section of [SKILL.md](../SKILL.md).
