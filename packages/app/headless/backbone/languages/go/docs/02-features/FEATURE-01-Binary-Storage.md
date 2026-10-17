# Backbone — FEATURE-01: Static Binary + SQLite Storage

## 1. Summary

Backbone ships as a single static Go binary backed by one SQLite file.

## 2. Behaviour

- `CGO_ENABLED=0` builds produce `bin/backbone`, self-contained (no glibc/musl).
- SQLite at `$BACKBONE_DATA/data.db` (default `~/.backbone/`).
- All persistence in `internal/store`: users, collections, records, buckets, files, webhooks, secrets, cronjobs, WS connections, WS messages, cache, notifications, logs, pubsub topics/messages, permissions.
- Migrations run on startup via `store.MigrateDB`.
- Uploads stored under `<dataDir>/uploads`.

## 3. Acceptance criteria

- `go build -o bin/backbone .` succeeds with `CGO_ENABLED=0`.
- Running `./backbone` opens SQLite and serves on `:8080` by default.
- Data directory overridable via `BACKBONE_DATA`.
