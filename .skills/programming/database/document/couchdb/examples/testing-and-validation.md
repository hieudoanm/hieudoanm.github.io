# optimistic concurrency: create, then always send _rev back on update: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Chose your transport: HTTP API or SDK (e.g., `pouchdb`, `couchbase` SDK, `nano`).
- [ ] Set up authentication (users DB, JWT/scoped users) and CORS allowances.
- [ ] Design documents with unique `_id`s and a revision-merge strategy.
- [ ] Add views/Mango indexes only for actual lookup patterns.
- [ ] Configure replication topology (master-master, filtered) with conflict handling.
- [ ] Plan compaction schedule and backup replication strategy.
- [ ] Enable monitoring for replication lag, disk usage, and tombstone overhead.

## Example

A team applying **create, then always send _rev back on update: Quick-Start Checklist** to a optimistic concurrency project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Chose your transport: HTTP API or SDK (e.g., `pouchdb`, `couchbase` SDK, `nano`).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for couchdb.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
