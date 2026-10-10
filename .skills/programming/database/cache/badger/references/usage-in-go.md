# 2. Usage in Go

Focused reference for **badger**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
