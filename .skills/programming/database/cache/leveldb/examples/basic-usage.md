# leveldb: Basic Usage

LevelDB — fast key-value storage library written by Google, providing ordered mapping from string keys to string values with a log-structured merge-tree.

## Scenario

Use this example as a starting point when applying **leveldb** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Usage in Go (syndtr/goleveldb)** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```go
opt := &opt.Options{
    BlockCacheCapacity: 64 << 20,   // 1/3 of a 256 MB budget
    WriteBuffer:        16 << 20,   // memtable before flush
    CompactionTableSize: 32 << 20,  // SSTable target
    Compression:        opt.SnappyCompression,
    OpenFilesCacheCapacity: 256,
}

db, err := leveldb.OpenFile("/var/lib/leveldb", opt)
if err != nil {
    return fmt.Errorf("open leveldb: %w", err)
}
defer db.Close()

batch := new(leveldb.Batch)
batch.Put([]byte("order:1001:status"), []byte("paid"))
batch.Put([]byte("order:1001:total"), []byte("99.00"))
batch.Delete([]byte("order:1001:note"))
if err := db.Write(batch, nil); err != nil {
    return fmt.Errorf("write batch: %w", err)
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
