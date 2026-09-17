# optimistic concurrency: create, then always send _rev back on update: 5. Operational Practices

## Source guidance

This example applies the **5. Operational Practices** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Run at least 3 nodes; use the cluster module (Paxos-based) for automatic sharding.
- Compact databases and views periodically: `_compact` and `_view_cleanup` release disk (tombstone overhead).
- Monitor via `_stats`, `_active_tasks`, Prometheus (`/ _metrics`).
- Store attachments either inline or in a separate blob store — attachments bloat replication and compaction.
- Backup via replication to a separate CouchDB instance or the snapshot tooling (e.g., `couchdb-dumps`).

## Example

A team applying **create, then always send _rev back on update: 5. Operational Practices** to a optimistic concurrency project treats this guidance as a review gate. It checks whether the current implementation satisfies **Run at least 3 nodes; use the cluster module (Paxos-based) for automatic sharding.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for couchdb.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
