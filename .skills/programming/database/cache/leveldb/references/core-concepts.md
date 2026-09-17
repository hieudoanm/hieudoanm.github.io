# 1. Core Concepts

Focused reference for **leveldb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- String keys and string values; keys are stored in sorted order.
- LSM tree: writes go to an in-memory **memtable**, flush to immutable **SSTable files**, and compacted asynchronously.
- Snapshot isolation: use `DB.NewSnapshot()` and pass to read options for a point-in-time read.
- Iterator: `db.NewIterator(&opt, nil)` provides sorted range scans over keys.
- Write batch: `batch := new(leveldb.Batch)` for atomic multi-key writes.
