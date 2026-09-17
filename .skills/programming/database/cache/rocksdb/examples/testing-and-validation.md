# Rocksdb: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Rocksdb. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Configure memtable size, block cache, and bloom filters for your access pattern.
- [ ] Use snapshots for consistent iteration; release iterators promptly.
- [ ] Batch multi-key writes with `WriteBatch`.
- [ ] Use `prefix_extractor` + bloom for prefix scans.
- [ ] Schedule backups via `BackupEngine`.
- [ ] Monitor `estimate-live-data-size`, pending compaction, and write amplification.
- [ ] Choose compaction style based on workload (level vs universal vs FIFO).

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
