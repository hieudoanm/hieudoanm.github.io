# 3. Tuning Options

Focused reference for **leveldb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Tuning Options

- `BlockCacheCapacity`: size of the block cache in bytes (default 8 MB); set to ~1/3 of available RAM.
- `CompactionTableSize`: SSTable size target; tune to balance read amplification vs write amplification.
- `WriteBuffer`: memtable size before flushing; larger → fewer compactions but more RAM.
- `Compression`: default Snappy; switch to None for in-memory-like workloads or ZSTD for better ratio.
- `OpenFilesCacheCapacity`: number of files kept open; tune to OS limits.
