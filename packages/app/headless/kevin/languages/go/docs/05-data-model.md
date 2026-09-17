# KeVIN (Go) — Data Model

## 1. Purpose

Defines in-memory data model and persistence schema.

## 2. In-Memory Model

- Store: `map[string]string` with string keys and string values
- Concurrency: `sync.RWMutex` (read/write locks)
- No relational schema (in-memory only)
- TTL support via expiry tracking (see db/ttl.go)

## 3. Snapshot Format

JSON snapshot on disk when using `--data` flag (atomic write via temp file + rename). Structure defined by persistence logic in `internal/db/persist.go`.
