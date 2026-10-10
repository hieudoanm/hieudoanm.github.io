# Apache Pulsar Best Practices: 4. Performance, Scaling & Operations

## Scenario

A project is working on **4. performance, scaling & operations** for Apache Pulsar Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Scale by adding brokers and partitions**
- **Tune batching and compression** for throughput vs latency
- **Monitor backlog, latency, and storage growth**
- **Understand BookKeeper write amplification** when sizing storage
- **Use tiered storage for long retention** (offload to object storage)
- **Plan for rebalancing and topic ownership** changes
- **Test broker and bookie failures**; monitor **geo-replication lag**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance, Scaling & Operations** section of [SKILL.md](../SKILL.md).
