# KeVIN (Go) — Operations

## 1. Purpose

Operational guidance: monitoring, security, backup/restore, rollback.

## 2. Monitoring

- Structured logging via `log/slog` (INFO/WARN/ERROR/DEBUG)
- Health checks via TCP connectivity (PING)
- Benchmarks available via `go test -bench`

## 3. Security

- Local-only by default
- No authentication in MVP (as documented in roadmap)
- MCP logs to stderr only; protocol on stdout

## 4. Backup & Recovery

- Snapshot via `--data` file (JSON). Save on shutdown, load on start. Atomic writes.
- Volume/host filesystem backup of snapshot file as needed.

## 5. Rollback

- Use previous binary from release artifacts
