# optimistic concurrency: create, then always send _rev back on update: 2. Access via HTTP

## Source guidance

This example applies the **2. Access via HTTP** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- REST API: `GET/PUT/POST/DELETE /db/{docid}`.
- Maintenance: `GET /_all_dbs`, `_changes` feed, `_compact`, `_replicate`.
Runnable: `examples/docker/compose/databases/documental/couchdb/docker-compose.yaml`
- Authentication: `Basic`, `JWT`, or `Cookie` (session) vs. `PW` / `Local` (DB setup). Use `_users` DB for `_design` docs? (Create dedicated users.)
- Use `ETag`/If-Match and `_rev` to implement optimistic concurrency: always send `_rev` on update; a `409 Conflict` means a revision mismatch.

## Example

A team applying **create, then always send _rev back on update: 2. Access via HTTP** to a optimistic concurrency project treats this guidance as a review gate. It checks whether the current implementation satisfies **REST API: `GET/PUT/POST/DELETE /db/{docid}`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for couchdb.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
