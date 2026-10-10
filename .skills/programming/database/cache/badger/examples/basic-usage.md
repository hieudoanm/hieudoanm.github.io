# badger: Basic Usage

Badger — embedded, high-performance key-value store written in Go, optimized for LSM-tree with value-log separation.

## Scenario

Use this example as a starting point when applying **badger** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Usage in Go** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
