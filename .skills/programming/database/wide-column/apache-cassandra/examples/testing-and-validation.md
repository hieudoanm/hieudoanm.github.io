# Apache Cassandra: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Apache Cassandra. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Design keyspace with `NetworkTopologyStrategy` and RF per DC.
- [ ] Design query-shaped tables with primary key + clustering key.
- [ ] Bound partition sizes; add time-bucket keys for high-write data.
- [ ] Prefer full partition-key queries; avoid `ALLOW FILTERING`.
- [ ] Configure read/write consistency (`LOCAL_QUORUM` default).
- [ ] Use LWT only where conditional writes are mandatory (higher cost).
- [ ] Schedule repairs; monitor `nodetool tpstats`, latency, and GC.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
