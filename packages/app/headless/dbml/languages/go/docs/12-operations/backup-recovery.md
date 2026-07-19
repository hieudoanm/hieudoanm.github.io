# dbml (Go) — Backup and Recovery

dbml is stateless. It reads DBML source, writes output files, and keeps no database, cache, volume, or configuration store.

## What is worth backing up

| Asset | Back up? | Why |
| ----- | -------- | --- |
| Source DBML files | Yes | The single source of truth; keep them version-controlled |
| Generated output (SQL, Mermaid, SVG) | Optional | Fully reproducible from source with one command |
| The dbml binary | Optional | Rebuildable from source (`make build`) or re-downloadable from the rolling release |
| Container image | Optional | Rebuildable from the `Dockerfile` at any commit |

Generated artifacts must not be treated as authoritative; per `AGENTS.md`, output is reproducible and not committed unless the repository explicitly requires it.

## Recovery procedures

Regenerate any output artifact from source:

```bash
make build
./bin/dbml all schema.dbml --output-dir ./output
```

Regenerate a single format:

```bash
./bin/dbml sql schema.dbml -o schema.sql
```

If the source files themselves are lost, recovery is a git operation (restore the repository), after which the commands above rebuild everything else.

## Backup checklist

- [ ] DBML sources are committed to version control.
- [ ] The git remote is itself backed up (this is the only true recovery input).
- [ ] Generated artifacts are treated as disposable caches, rebuilt on demand.
- [ ] No dbml-specific backup agent, schedule, or snapshot config exists — none is needed for a stateless tool.

## Cross-references

- Operations: [`12-operations.md`](../12-operations.md)
- Deployment: [`11-deployment.md`](../11-deployment.md)
- Disaster recovery: [`disaster-recovery.md`](disaster-recovery.md)
