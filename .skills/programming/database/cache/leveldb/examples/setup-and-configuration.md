# Leveldb: 4. Iterators and Scans

## Source guidance

This example applies the **4. Iterators and Scans** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- `db.NewIterator(nil, nil)` iterates all keys; use `Seek(key)` for prefix or range start.
- `iter.Release()` must be called after use to close internal resources.
- Filter: check `iter.Valid()` and `iter.Error()` before accessing `iter.Key()`/`iter.Value()`.
- Prefix scans are efficient: `opt.Prefix = []byte("user:")`.

## Example

```go
// snapshot read: stable view even while other goroutines write
snapshot, err := db.GetSnapshot()
if err != nil {
    return fmt.Errorf("snapshot: %w", err)
}
defer snapshot.Release()

prefix := []byte("order:")
iter := snapshot.NewIterator(util.BytesPrefix(prefix), nil)
defer iter.Release() // mandatory: leaks memory and file descriptors

for iter.Next() {
    status, err := snapshot.Get(iter.Key(), nil) // resolves the value
    if err != nil {
        return fmt.Errorf("get %s: %w", iter.Key(), err)
    }
    log.Printf("%s = %s", iter.Key(), status)
}
if err := iter.Error(); err != nil {
    return fmt.Errorf("iterate: %w", err)
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for leveldb.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
