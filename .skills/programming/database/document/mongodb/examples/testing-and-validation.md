# MongoDB Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for MongoDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Schema designed from query patterns before code
- [ ] Embed vs reference chosen by cardinality/access; documents bounded
- [ ] No unbounded document growth; `$lookup`/nested arrays used deliberately
- [ ] Indexes on all hot query fields; no production collection scans
- [ ] Pagination safe (bounded skip/search-after); no N+1
- [ ] Shard key planned before scaling; no monotonic hotspots
- [ ] Auth/RBAC enabled; db not internet-exposed; input validated app-side

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
