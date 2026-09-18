---
name: rocksdb
description: RocksDB — high-performance embedded key-value store from Facebook, a pluggable LSM-based database used by many databases and applications.
---

RocksDB is a **high-performance embedded key-value store** developed by Facebook, built on the **LSM (log-structured merge) architecture** with pluggable components. It powers many production storage systems (MySQL/RocksDB, CockroachDB, TiKV, Kafka's RocksDB-based state stores, Rockset, TimescaleDB).

## 1. Core Concepts

- **LSM tree**: memtable(s) → immutable memtables → SSTable files in increasing levels (L0→Ln), compacted in background.
- **Write path**: writes go into the write-ahead log (WAL) and memtable for crash safety + performance.
- **Read path**: check memtable, then SSTables via **Bloom filters** and **block cache**.
- Pluggable **compression** (Snappy, LZ4, Zstd), **checksums**, and **prefix extractors**.
- Column families group related key-value pairs; multiple CFs share the same DB metadata but separate memtables/SSTables.

## 2. Key Configuration

- `write_buffer_size`: memtable size; tune to balance CPU/RAM vs write throughput.
- `max_write_buffer_number`: number of memtables before stalling (L0).
- `target_file_size_base`: SSTable size baseline; drives level layout.
- `max_bytes_for_level_base`: level fan-out sizing; adjust multipliers (10× default).
- `block_cache`: default 8 MB; use `LRUCache` (LRU) — set to ~1/3 of RAM.
- `bloom_locality`, `filter_policy`: use `NewBloomFilterPolicy(10)` for point reads.
- `compaction_style`: `kCompactionStyleLevel` (default), `kCompactionStyleUniversal`, or `kCompactionStyleFIFO` (time-to-live).

## 3. Write Amplification and Tuning

- **Write amplification (WA)** comes from compaction; larger multilevel targets reduce it at the cost of RAM.
- Universal compaction is better for write-heavy/append-only workloads; level compaction better for mixed.
- Tune with `compaction_options_universal.*` and `*_compaction_concurrency`.
- Use **`WriteBatch`** to batch many key changes in one write.

## 4. Reads, Iterators, and Prefix

- Iterators are **snapshot-based**: create a `Snapshot` and pass read options for consistency.
- Prefix scans: enable `prefix_extractor` (e.g., SliceTransform) to use bloom filters for prefix seeks.
- **Reverse iteration** is supported via `Iterator.SeekForPrev`.
- Use **range tombstones** or **compaction filters** for keys used rarely before heavy scans.

## 5. Operations and Pitfalls

- **Backups**: `BackupEngine` allows incremental/full backups; restore with `BackupEngine.RestoreFromBackup`.
- Monitoring: `GetIntProperty` (`rocksdb.estimate-live-data-size`, `rocksdb.num-immutable-mem-table`, etc.) and **PerfContext** for fine-grained stats.
- Manual compaction: `CompactRange` (`rocksdb.deleteobsoletefiles`) to reclaim space.
- Exceptional tuning: use `PendingCompactionBytes` as a warning threshold before runaway compaction.
- **Danger**: enabling `compaction_style=kCompactionStyleFIFO` without TTL can drop data.

## 6. Common Pitfalls

- Running with default `write_buffer_size` on a large working set → instant L0 stalls.
- Ignoring **sync=false** option on writes for durability-critical paths — always consider `WritableFileSync` / `sync=fmode`.
- Holding iterators open → leaked snapshots that block compaction.
- Using universal compaction with heavy deletes → files never shrunk.

## General Rules of Thumb

- Size memtables and block cache to the working set; use bloom filters for point reads.
- Batch writes to reduce WA if you don't need per-key sync.
- Set `WritableFileSync` / `sync` per your durability vs performance trade-off.
- Monitor `estimate-live-data-size` and compaction pending bytes.

## Quick-Start Checklist

- [ ] Configure memtable size, block cache, and bloom filters for your access pattern.
- [ ] Use snapshots for consistent iteration; release iterators promptly.
- [ ] Batch multi-key writes with `WriteBatch`.
- [ ] Use `prefix_extractor` + bloom for prefix scans.
- [ ] Schedule backups via `BackupEngine`.
- [ ] Monitor `estimate-live-data-size`, pending compaction, and write amplification.
- [ ] Choose compaction style based on workload (level vs universal vs FIFO).