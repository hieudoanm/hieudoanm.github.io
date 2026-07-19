# Backbone — Backup and Recovery

## Backup

Back up the SQLite data directory (default `~/.backbone/`). The database file (`data.db`), uploads, and secrets key file (`secrets.key`) constitute the full state.

```bash
tar -czf backbone-backup.tar.gz ~/.backbone/
```

## Recovery

1. Restore the `~/.backbone/` directory from backup.
2. Run `./backbone` — it opens the existing SQLite and serves on `:8080`.
3. Verify `GET /api/health` returns `{"status":"ok"}`.

## Acceptance criteria

- A running instance can be fully reproduced from the backed-up data directory.
- Recovery does not require re-seeding data.
