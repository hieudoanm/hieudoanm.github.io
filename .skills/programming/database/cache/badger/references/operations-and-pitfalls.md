# 5. Operations and Pitfalls

Focused reference for **badger**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Operations and Pitfalls

- **No network server** — it is a library embedded in your Go process.
- Back up by copying the data directory only when the DB is closed, or use `db.Backup()` for a consistent snapshot.
- Monitor with `db.Tables()` and `db.Size()` for LSM health.
- Badger GC runs in background; optionally call `db.RunValueLogGC(0.5)` periodically.
- Path locking: only open a `badger.DB` from one process at a time.
