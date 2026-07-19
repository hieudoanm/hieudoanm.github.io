# Rocksdb: 5. Operations and Pitfalls

## Scenario

A project is working on **5. operations and pitfalls** for Rocksdb. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Backups**: `BackupEngine` allows incremental/full backups; restore with `BackupEngine.RestoreFromBackup`.
- Monitoring: `GetIntProperty` (`rocksdb.estimate-live-data-size`, `rocksdb.num-immutable-mem-table`, etc.) and **PerfContext** for fine-grained stats.
- Manual compaction: `CompactRange` (`rocksdb.deleteobsoletefiles`) to reclaim space.
- Exceptional tuning: use `PendingCompactionBytes` as a warning threshold before runaway compaction.
- **Danger**: enabling `compaction_style=kCompactionStyleFIFO` without TTL can drop data.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Operations and Pitfalls** section of [SKILL.md](../SKILL.md).
