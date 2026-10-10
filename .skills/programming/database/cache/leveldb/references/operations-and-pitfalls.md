# 5. Operations and Pitfalls

Focused reference for **leveldb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Operations and Pitfalls

- LevelDB is a **single-process, embedded-only** library — no network protocol.
- Back up by copying the data directory while the DB is closed.
- Concurrent writes from a single process are serialized internally; use write batches for atomicity.
- Compaction runs in background; tune `CompactionL0Trigger`, `CompactionTableSize`, and `NumFilesThreshold`.
- Memory: RAM ≈ `BlockCacheCapacity + WriteBuffer + open file handles`.
