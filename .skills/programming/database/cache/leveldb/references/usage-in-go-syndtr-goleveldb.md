# 2. Usage in Go (syndtr/goleveldb)

Focused reference for **leveldb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Usage in Go (syndtr/goleveldb)

- Open: `db, err := leveldb.OpenFile(path, &opt)`.
- Reads: `data, err := db.Get(key, nil)`; check for `errors.Is(err, leveldb.ErrNotFound)`.
- Writes: `db.Put(key, value, nil)`; deletes: `db.Delete(key, nil)`.
- Batch: `batch.Put(...)`, `batch.Delete(...)`, then `db.Write(batch, nil)`.
- Compact range: `db.CompactRange(util.Range{Start: from, Limit: to})` to reclaim space.

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
