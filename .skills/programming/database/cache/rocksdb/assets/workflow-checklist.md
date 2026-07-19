# rocksdb: Workflow Checklist

A practical run sheet for applying [rocksdb](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **LSM tree**: memtable(s) → immutable memtables → SSTable files in increasing levels (L0→Ln), compacted in background
- [ ] 1. Core Concepts: **Write path**: writes go into the write-ahead log (WAL) and memtable for crash safety + performance
- [ ] 2. Key Configuration: write_buffer_size: memtable size; tune to balance CPU/RAM vs write throughput
- [ ] 2. Key Configuration: max_write_buffer_number: number of memtables before stalling (L0)
- [ ] 3. Write Amplification and Tuning: **Write amplification (WA)** comes from compaction; larger multilevel targets reduce it at the cost of RAM
- [ ] 3. Write Amplification and Tuning: Universal compaction is better for write-heavy/append-only workloads; level compaction better for mixed
- [ ] 4. Reads, Iterators, and Prefix: Iterators are **snapshot-based**: create a Snapshot and pass read options for consistency
- [ ] 4. Reads, Iterators, and Prefix: Prefix scans: enable prefix_extractor (e.g., SliceTransform) to use bloom filters for prefix seeks
- [ ] 5. Operations and Pitfalls: **Backups**: BackupEngine allows incremental/full backups; restore with BackupEngine.RestoreFromBackup
- [ ] 5. Operations and Pitfalls: Monitoring: GetIntProperty (rocksdb.estimate-live-data-size, rocksdb.num-immutable-mem-table, etc.) and **PerfContext** for fine-grained stats

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
