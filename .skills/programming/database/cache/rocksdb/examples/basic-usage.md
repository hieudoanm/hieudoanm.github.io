# rocksdb: Basic Usage

RocksDB — high-performance embedded key-value store from Facebook, a pluggable LSM-based database used by many databases and applications.

## Scenario

Use this example as a starting point when applying **rocksdb** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Key Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
