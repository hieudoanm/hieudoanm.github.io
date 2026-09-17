# Rocksdb: Starter Template

A reusable starting point derived from the **2. Key Configuration** section of [Rocksdb](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
