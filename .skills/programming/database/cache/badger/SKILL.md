---
name: "badger"
description: "Badger — embedded, high-performance key-value store written in Go, optimized for LSM-tree with value-log separation."
tags:
  - "programming"
  - "database"
  - "cache"
  - "badger"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Badger in a project."
prerequisites:
  - "Familiarity with the application’s data model and access patterns."
  - "For implementation, access to the database environment or representative schema."
related_skills:
  - "../rocksdb/SKILL.md"
  - "../leveldb/SKILL.md"
  - "../valkey/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Badger is a **fast, embeddable Go key-value store** built on an **LSM tree with a separate value log (WiscKey paper)**, giving fast writes and high read performance without external dependencies.

## 1. Core Concepts

- Key-value pairs with **ordered byte keys**; supports prefix scans and range iterations.
- LSM tree for keys + metadata; separate **value log (vLog)** for large values to reduce write amplification.
- Transactions are optimistic and ACID; use `NewTransaction` + `Set`/`Delete` + `Discard`.
- TTL and expiration per key: set via `entry.ExpiresAt`.
- Supports streaming (ordered bulk reads) and batch writes for bulk operations.

## 2. Usage in Go

- Open with `badger.Open(badger.DefaultOptions(path))`.
- Single `*badger.DB` instance per path; multiple goroutines can share it safely.
- Reads: `db.Get(key)` → `entry.Value()`; beware value is only valid within the transaction context — call `entry.ValueCopy(nil)` if you need it outside.
- Writes: use `txn.Set(key, value)` then `txn.Commit()`.
- Iteration: `txn.NewIterator(opts)` + `prefix.Seek(key)` for range scans.

```go
db, err := badger.Open(badger.DefaultOptions("/var/lib/badger"))
if err != nil {
    return fmt.Errorf("open badger: %w", err)
}
defer db.Close()

err = db.Update(func(txn *badger.Txn) error {
    // commit: apply or discard; the txn owns the entry memory
    return txn.Set([]byte("order:1001:status"), []byte("paid"))
})
if err != nil {
    return fmt.Errorf("set status: %w", err)
}

err = db.View(func(txn *badger.Txn) error {
    item, err := txn.Get([]byte("order:1001:status")) // errors.ErrKeyNotFound is normal
    if err != nil {
        return err
    }
    value, err := item.ValueCopy(nil) // copy out before the txn closes
    if err != nil {
        return fmt.Errorf("copy value: %w", err)
    }
    log.Printf("status=%s", value)
    return nil
})
if err != nil {
    return fmt.Errorf("read status: %w", err)
}
```

## 3. Value Log and Performance Tuning

- Large values stored in the vLog improve write throughput; keys stay in the LSM tree.
- `ValueThreshold` (default 1MB) determines when values go to vLog — tune based on your read/write ratio.
- Compaction: Badger compacts LSM levels automatically; set `NumLevelZeroTables` and `NumLevelZeroTablesStall` to tune memory/performance.
- Set `MaxTableSize` and `BaseTableSize` to keep LSM trees healthy.

## 4. Transactions

- ACID with optimistic concurrency; `ConflictError` on write conflicts — retry.
- Use `Discard()` after `Commit()` to release resources; defer it to prevent leaks.
- Read-only transactions: `db.NewTransaction(false)` with `defer txn.Discard()`.
- Badger does not support distributed transactions — it is a single-node embedded store.

```go
func reserveStock(db *badger.DB, sku string, qty int64) error {
    for attempt := range 3 { // ErrConflict means someone else committed first
        err := db.Update(func(txn *badger.Txn) error {
            item, err := txn.Get([]byte("stock:" + sku))
            if err != nil {
                return fmt.Errorf("get stock: %w", err)
            }
            available, err := item.Int64()
            if err != nil {
                return fmt.Errorf("decode stock: %w", err)
            }
            if available < qty {
                return fmt.Errorf("insufficient stock for %s: %d left", sku, available)
            }
            remaining, _ := json.Marshal(available - qty)
            return txn.Set([]byte("stock:"+sku), remaining)
        })
        if err == nil || !errors.Is(err, badger.ErrConflict) {
            return err
        }
        log.Printf("write conflict on %s, retry %d", sku, attempt)
    }
    return errors.New("reserve stock: exhausted retries")
}
```

## 5. Operations and Pitfalls

- **No network server** — it is a library embedded in your Go process.
- Back up by copying the data directory only when the DB is closed, or use `db.Backup()` for a consistent snapshot.
- Monitor with `db.Tables()` and `db.Size()` for LSM health.
- Badger GC runs in background; optionally call `db.RunValueLogGC(0.5)` periodically.
- Path locking: only open a `badger.DB` from one process at a time.

## 6. Common Pitfalls

- Reading a value outside its transaction context → use `entry.ValueCopy(nil)`.
- Not discarding transactions → resource and memory leaks.
- Running multiple processes on the same `dir` → corruption.
- Ignoring vLog size growth → disk fills silently if values are large.

## General Rules of Thumb

- Use Badger for embedded, high-throughput key-value needs — not as a general relational database.
- Keep the value small in the LSM; large values go to vLog (default threshold works well).
- Always `Discard()` transactions; defer to prevent leaks.
- Back up with the DB closed or via `db.Backup()`.

## Quick-Start Checklist

- [ ] Initialize `badger.DB` with sensible `Options`; set `ValueThreshold` based on value sizes.
- [ ] Use transactions with `Set`/`Delete` + `Commit` + `Discard`.
- [ ] For large reads, use `entry.ValueCopy(nil)`.
- [ ] Use `NewIterator` with prefix scans; avoid full scans.
- [ ] Schedule periodic `RunValueLogGC(0.5)` to reclaim stale value log space.
- [ ] Monitor LSM level sizes and vLog size.
- [ ] Backup only when DB is closed or via `db.Backup()`.
