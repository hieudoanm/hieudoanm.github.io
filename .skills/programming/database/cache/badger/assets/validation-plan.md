# badger: Validation Plan

Use this plan to verify work guided by [badger](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Large values stored in the vLog improve write throughput; keys stay in the LSM tree
- [ ] ValueThreshold (default 1MB) determines when values go to vLog — tune based on your read/write ratio
- [ ] Compaction: Badger compacts LSM levels automatically; set NumLevelZeroTables and NumLevelZeroTablesStall to tune memory/performance
- [ ] Set MaxTableSize and BaseTableSize to keep LSM trees healthy
- [ ] **No network server** — it is a library embedded in your Go process
- [ ] Back up by copying the data directory only when the DB is closed, or use db.Backup() for a consistent snapshot
- [ ] Monitor with db.Tables() and db.Size() for LSM health
- [ ] Badger GC runs in background; optionally call db.RunValueLogGC(0.5) periodically
- [ ] Path locking: only open a badger.DB from one process at a time
- [ ] Reading a value outside its transaction context → use entry.ValueCopy(nil)

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
