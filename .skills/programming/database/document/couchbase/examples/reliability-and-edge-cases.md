# Couchbase: 6. Common Pitfalls

## Scenario

A project is working on **6. common pitfalls** for Couchbase. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Querying N1QL without indexes → full bucket scans and timeouts.
- Treating buckets like SQL schemas and over-normalizing JSON.
- Ignoring **replica/durability** settings in environments that require durability guarantees.
- Using a bucket per tenant at high scale — prefer a shared bucket with scope/collection partitioning.
- Not planning for **garbage collection of tombstones** and expired documents (`TTL`).

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md).
