# Badger: 4. Transactions

## Source guidance

This example applies the **4. Transactions** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- ACID with optimistic concurrency; `ConflictError` on write conflicts — retry.
- Use `Discard()` after `Commit()` to release resources; defer it to prevent leaks.
- Read-only transactions: `db.NewTransaction(false)` with `defer txn.Discard()`.
- Badger does not support distributed transactions — it is a single-node embedded store.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for badger.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
