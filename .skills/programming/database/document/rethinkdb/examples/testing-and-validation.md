# Rethinkdb: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Rethinkdb. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Set up driver SDK and connect with `r.connect` (persistent pool).
- [ ] Define tables, sharding, and secondary/compound indexes.
- [ ] Validate hot queries with `explain()` and check index usage.
- [ ] Implement changefeeds with `includeInitial`, `squash`, and a client store.
- [ ] Choose durability & conflict policies per write path.
- [ ] Provision RAM sized to the working set; monitor cache and RAM.
- [ ] Add monitoring for query latency, feed lag, and table sizes.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
