# Apache Iceberg Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Schema + `PartitionSpec` deliberate at creation (access-pattern-driven)
- [ ] Idempotent writes; `MERGE` for upserts; concurrency-commit protocol understood
- [ ] Snapshot-aware reads (`FOR SYSTEM_TIME/VERSION`); tags/branches for goldens
- [ ] Scheduled `rewrite_data_files`/`expire_snapshots`/`remove_orphan_files`
- [ ] REST catalog configured; engines share the same metadata
- [ ] Monitoring: snapshot/file-health alerts; GC retention documented

## Example

A team applying **Quick-Start Checklist** to a Apache Iceberg Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Schema + `PartitionSpec` deliberate at creation (access-pattern-driven)**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for apache-iceberg-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
