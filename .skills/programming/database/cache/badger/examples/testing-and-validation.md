# Badger: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Badger. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Initialize `badger.DB` with sensible `Options`; set `ValueThreshold` based on value sizes.
- [ ] Use transactions with `Set`/`Delete` + `Commit` + `Discard`.
- [ ] For large reads, use `entry.ValueCopy(nil)`.
- [ ] Use `NewIterator` with prefix scans; avoid full scans.
- [ ] Schedule periodic `RunValueLogGC(0.5)` to reclaim stale value log space.
- [ ] Monitor LSM level sizes and vLog size.
- [ ] Backup only when DB is closed or via `db.Backup()`.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
