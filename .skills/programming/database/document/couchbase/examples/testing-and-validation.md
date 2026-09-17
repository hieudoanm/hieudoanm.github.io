# Couchbase: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Couchbase. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Design buckets, scopes, collections, and granular permissions (`RBAC`).
- [ ] Model the access patterns: decide which flows are KV vs N1QL vs FTS.
- [ ] Create indexes for all filter/order fields; verify with `EXPLAIN`.
- [ ] Set replicas, durability requirements, and TTLs.
- [ ] Configure bucket memory quotas sized to the working set.
- [ ] Wire the SDK with connection pooling, retries, and CAS-based updates.
- [ ] Add XDCR for disaster recovery where required.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
