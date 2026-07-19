# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for hbase shell -n runs non-interactively; in 2.x every table lives in a namespace. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Design row keys with pre-splits and salting to avoid hotspots.
- [ ] Define few column families; set compression, TTL, IN_MEMORY based on access.
- [ ] Pre-split table during creation for parallel writes.
- [ ] Use batch APIs for multi-row operations; prefer Get/Scan with filters.
- [ ] Balance RegionServer heap and block cache; monitor GC.
- [ ] Enable snapshot backups and automated compaction tuning.
- [ ] Schedule `major_compact` during low-traffic windows as needed.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
