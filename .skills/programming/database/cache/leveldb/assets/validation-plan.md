# leveldb: Validation Plan

Use this plan to verify work guided by [leveldb](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] LevelDB is a **single-process, embedded-only** library — no network protocol
- [ ] Back up by copying the data directory while the DB is closed
- [ ] Concurrent writes from a single process are serialized internally; use write batches for atomicity
- [ ] Compaction runs in background; tune CompactionL0Trigger, CompactionTableSize, and NumFilesThreshold
- [ ] Memory: RAM ≈ BlockCacheCapacity + WriteBuffer + open file handles
- [ ] Ignoring iterator Release() → memory leak and file descriptor leak
- [ ] Using large WriteBuffer without sufficient RAM → swap and latency spikes
- [ ] Forgetting leveldb.ErrNotFound on Get — treat it as a normal "not found" case
- [ ] Running multiple processes on the same directory → corruption

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
