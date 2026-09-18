---
name: leveldb
description: LevelDB — fast key-value storage library written by Google, providing ordered mapping from string keys to string values with a log-structured merge-tree.
---

LevelDB is a **lightweight, embedded key-value store** providing **ordered string key→value** mappings backed by an **LSM (log-structured merge) tree**, originally developed by Google for Chrome.

## 1. Core Concepts

- String keys and string values; keys are stored in sorted order.
- LSM tree: writes go to an in-memory **memtable**, flush to immutable **SSTable files**, and compacted asynchronously.
- Snapshot isolation: use `DB.NewSnapshot()` and pass to read options for a point-in-time read.
- Iterator: `db.NewIterator(&opt, nil)` provides sorted range scans over keys.
- Write batch: `batch := new(leveldb.Batch)` for atomic multi-key writes.

## 2. Usage in Go (syndtr/goleveldb)

- Open: `db, err := leveldb.OpenFile(path, &opt)`.
- Reads: `data, err := db.Get(key, nil)`; check for `errors.Is(err, leveldb.ErrNotFound)`.
- Writes: `db.Put(key, value, nil)`; deletes: `db.Delete(key, nil)`.
- Batch: `batch.Put(...)`, `batch.Delete(...)`, then `db.Write(batch, nil)`.
- Compact range: `db.CompactRange(util.Range{Start: from, Limit: to})` to reclaim space.

## 3. Tuning Options

- `BlockCacheCapacity`: size of the block cache in bytes (default 8 MB); set to ~1/3 of available RAM.
- `CompactionTableSize`: SSTable size target; tune to balance read amplification vs write amplification.
- `WriteBuffer`: memtable size before flushing; larger → fewer compactions but more RAM.
- `Compression`: default Snappy; switch to None for in-memory-like workloads or ZSTD for better ratio.
- `OpenFilesCacheCapacity`: number of files kept open; tune to OS limits.

## 4. Iterators and Scans

- `db.NewIterator(nil, nil)` iterates all keys; use `Seek(key)` for prefix or range start.
- `iter.Release()` must be called after use to close internal resources.
- Filter: check `iter.Valid()` and `iter.Error()` before accessing `iter.Key()`/`iter.Value()`.
- Prefix scans are efficient: `opt.Prefix = []byte("user:")`.

## 5. Operations and Pitfalls

- LevelDB is a **single-process, embedded-only** library — no network protocol.
- Back up by copying the data directory while the DB is closed.
- Concurrent writes from a single process are serialized internally; use write batches for atomicity.
- Compaction runs in background; tune `CompactionL0Trigger`, `CompactionTableSize`, and `NumFilesThreshold`.
- Memory: RAM ≈ `BlockCacheCapacity + WriteBuffer + open file handles`.

## 6. Common Pitfalls

- Ignoring iterator `Release()` → memory leak and file descriptor leak.
- Using large `WriteBuffer` without sufficient RAM → swap and latency spikes.
- Forgetting `leveldb.ErrNotFound` on `Get` — treat it as a normal "not found" case.
- Running multiple processes on the same directory → corruption.

## General Rules of Thumb

- LevelDB is ideal for small, embedded, high-throughput key-value stores.
- Tune block cache and write buffer to fit your working set.
- Use `WriteBatch` for multi-key atomic writes.
- Compact ranges periodically to reclaim space after heavy deletes.

## Quick-Start Checklist

- [ ] Open with sensible `Options`: `BlockCacheCapacity`, `WriteBuffer`, `Compression`.
- [ ] Use `Get`/`Put`/`Delete` with proper error handling (`ErrNotFound`).
- [ ] Use `WriteBatch` for atomic multi-key writes.
- [ ] Call `iter.Release()` after every iterator use.
- [ ] Schedule periodic `CompactRange` to reclaim disk space.
- [ ] Monitor `db.Size()` and compaction metrics.
- [ ] Back up by copying the data directory when the DB is closed.