# Operations

Local operations for dbml.

## Sections

- [Backup and Recovery](./12-operations/backup-recovery.md)
- [Monitoring and Alerting](./12-operations/monitoring-alerting.md)
- [Security](./12-operations/security.md)
- [Rollback Strategy](./12-operations/rollback-strategy.md)
- [Disaster Recovery](./12-operations/disaster-recovery.md)

## Backup and Recovery

dbml is stateless and produces output files. Backup consists of:

- Source DBML files (version-controlled).
- Generated output files (SQL, Mermaid, SVG) — reproducible from source, so backup is optional.

Recovery: re-run `dbml all schema.dbml` to regenerate any output artifact.

## Monitoring and Alerting

The HTTP server exposes:

- `GET /health` — health check endpoint.
- Structured logging via slog.

No external metrics or alerting in the initial release.

## Security

- No secrets in code or configuration.
- No network calls by default.
- Pure Go (no CGO) reduces the attack surface.
- HTTP server binds to `127.0.0.1` by default in local mode.

## Rollback Strategy

dbml is a single binary. Rollback is achieved by replacing the binary with the previous version:

```bash
# Download previous release
# Replace bin/dbml
./bin/dbml --version
```

Generated output files are reproducible from source, so no data migration is needed.

## Disaster Recovery

Since dbml is stateless and all output is reproducible from DBML source, disaster recovery consists of:

1. Rebuild the binary from source (`make build`).
2. Re-run conversions against source DBML files.
3. Verify output correctness.

No database or persistent state to recover.

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Deployment: [`11-deployment.md`](11-deployment.md)
