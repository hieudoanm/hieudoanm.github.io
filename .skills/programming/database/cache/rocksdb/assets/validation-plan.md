# rocksdb: Validation Plan

Use this plan to verify work guided by [rocksdb](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Backups**: BackupEngine allows incremental/full backups; restore with BackupEngine.RestoreFromBackup
- [ ] Monitoring: GetIntProperty (rocksdb.estimate-live-data-size, rocksdb.num-immutable-mem-table, etc.) and **PerfContext** for fine-grained stats
- [ ] Manual compaction: CompactRange (rocksdb.deleteobsoletefiles) to reclaim space
- [ ] Exceptional tuning: use PendingCompactionBytes as a warning threshold before runaway compaction
- [ ] **Danger**: enabling compaction_style=kCompactionStyleFIFO without TTL can drop data
- [ ] Running with default write_buffer_size on a large working set → instant L0 stalls
- [ ] Ignoring **sync=false** option on writes for durability-critical paths — always consider WritableFileSync / sync=fmode
- [ ] Holding iterators open → leaked snapshots that block compaction
- [ ] Using universal compaction with heavy deletes → files never shrunk

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
