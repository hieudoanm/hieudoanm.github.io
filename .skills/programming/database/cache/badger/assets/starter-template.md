# Badger: Starter Template

A reusable starting point derived from the **4. Transactions** section of [Badger](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
