# dbml (Go) — Disaster Recovery

Because dbml holds no state, disaster recovery is "rebuild and reconvert". Everything the tool produces is derivable from two inputs: the source code (to build the binary) and the DBML source files (to produce output).

## Recovery procedure

1. Restore the repository and the DBML source files from version control.
2. Rebuild the binary: `make build` (Go 1.27.2+, `CGO_ENABLED=0`).
3. Re-run conversions: `./bin/dbml all schema.dbml --output-dir ./output`.
4. Verify output correctness: SQL executes against PostgreSQL, Mermaid renders, SVG opens.

If building from source is not possible at the time, download a binary from the GitHub Release `app-headless-dbml-latest` (linux/amd64, linux/arm64, darwin/amd64, darwin/arm64) and proceed from step 3.

## Loss scenarios

| Scenario | Recovery |
| -------- | -------- |
| Generated outputs deleted | Re-run `dbml all` — no other action |
| Binary deleted or corrupted | `make build`, or download from the rolling release |
| Container image lost | `docker build -t dbml .` from a checkout |
| Local checkout lost | Clone the repository; everything else is rebuilt |
| DBML sources lost | Recover from the git remote — this is the only unrecoverable-by-rebuild asset if the remote is also lost |

## Recovery objectives

No formal RTO or RPO is defined: dbml is a demonstration tool, and the recovery steps above are manual. Recovery time is dominated by environment setup (Go toolchain or Docker), not by dbml itself.

## Disaster recovery checklist

- [ ] The git remote holding DBML sources is backed up and reachable.
- [ ] Team members know the four recovery steps above.
- [ ] A smoke conversion (`dbml all`) is run after any recovery to confirm the toolchain.

## Cross-references

- Operations: [`12-operations.md`](../12-operations.md)
- Backup and recovery: [`backup-recovery.md`](backup-recovery.md)
- Rollback strategy: [`rollback-strategy.md`](rollback-strategy.md)
