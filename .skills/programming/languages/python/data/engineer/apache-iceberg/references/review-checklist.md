# Review checklist

Focused reference for **apache-iceberg-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Catalog (Hive/Hadoop/REST/Glue) manages the table metadata; REST catalog favored for multi-engine.**
- **Engine parity (Spark/Trino/Flink) on the same catalog — same metadata, same snapshots.**
- **Monitoring: snapshot count, orphan files, aggregate small-file counts; alert on drift.**
- **Tests: time-travel query reliability, concurrent-commit behavior, and compaction safety.**

---

## General Rules of Thumb

- **`PartitionSpec` by access pattern; transforms (days/bucket) over raw columns.**
- **Every write = a snapshot; idempotent commits; time travel enabled.**
- **Maintenance scheduled: rewrite files, expire snapshots, remove orphans.**
- **Concurrent commits via catalog optimistic concurrency; design to avoid conflicts.**
- **REST catalog + engine parity; retention policies documented.**

---

## Quick-Start Checklist

- [ ] Schema + `PartitionSpec` deliberate at creation (access-pattern-driven)
- [ ] Idempotent writes; `MERGE` for upserts; concurrency-commit protocol understood
- [ ] Snapshot-aware reads (`FOR SYSTEM_TIME/VERSION`); tags/branches for goldens
- [ ] Scheduled `rewrite_data_files`/`expire_snapshots`/`remove_orphan_files`
- [ ] REST catalog configured; engines share the same metadata
- [ ] Monitoring: snapshot/file-health alerts; GC retention documented
