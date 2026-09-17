# 2. Key Configuration

Focused reference for **rocksdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Key Configuration

- `write_buffer_size`: memtable size; tune to balance CPU/RAM vs write throughput.
- `max_write_buffer_number`: number of memtables before stalling (L0).
- `target_file_size_base`: SSTable size baseline; drives level layout.
- `max_bytes_for_level_base`: level fan-out sizing; adjust multipliers (10× default).
- `block_cache`: default 8 MB; use `LRUCache` (LRU) — set to ~1/3 of RAM.
- `bloom_locality`, `filter_policy`: use `NewBloomFilterPolicy(10)` for point reads.
- `compaction_style`: `kCompactionStyleLevel` (default), `kCompactionStyleUniversal`, or `kCompactionStyleFIFO` (time-to-live).

```go
opts := rocksdb.NewDefaultOptions()
opts.SetCreateIfMissing(true)
opts.SetWriteBufferSize(64 << 20)    // 64 MB memtable
opts.SetMaxWriteBufferNumber(4)      // stall L0 once 4 memtables are queued
opts.SetTargetFileSizeBase(64 << 20) // 64 MB SSTable baseline
opts.SetCompression(rocksdb.SnappyCompression)
opts.SetBlockCache(rocksdb.NewLRUCache(256 << 20)) // ~1/3 of a 1 GB container
opts.SetFilterPolicy(rocksdb.NewBloomFilterPolicy(10))
opts.SetPrefixExtractor(rocksdb.NewFixedPrefixTransform(8)) // "order:" length

db, err := rocksdb.Open(opts, "/var/lib/rocksdb")
if err != nil {
    return fmt.Errorf("open rocksdb: %w", err)
}
defer db.Close()
```
