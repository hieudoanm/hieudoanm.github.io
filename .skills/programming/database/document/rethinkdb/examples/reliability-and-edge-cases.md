# Rethinkdb: 5. Operations and Architecture

## Scenario

A project is working on **5. operations and architecture** for Rethinkdb. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Clustered deployment with **shard per table**, optionally replicated (`replicas: 2`).
- Table metadata on the cluster; use the web admin or driver for reconfigurations.
- **Memory & disk**: RethinkDB stores all data/working set in RAM; provision memory for the working set and tune `cache-size`.
- Unscheduled reads return backpressure to the client (`RethinkDBTimeoutError`) — design queries with limits (`limit()`, `maxBatchRows`) and use `no_reply` for fire-and-forget writes.
- Avoid blocking CPU-heavy reduce functions; prefer aggregation at the DB level.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Operations and Architecture** section of [SKILL.md](../SKILL.md).
