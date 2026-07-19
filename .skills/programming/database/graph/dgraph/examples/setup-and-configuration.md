# Dgraph: 5. Operations and Architecture

## Source guidance

This example applies the **5. Operations and Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Deploy as a cluster: `dgraph-ratel` for the UI, `dgraph zero` for metadata, `dgraph alpha` for data.
- Horizontal scale via `--shards N` and `--replicas R`; data is split across Alpha groups.
- Bulk-loading: use `dgraph live` or `bulk` to load from RDF/JSON/RDF-Quad files; for production, use `bulk` to pre-split, then `live`.
- Backups: `dgraph backup` to S3/GCS/local; restore with `dgraph restore`.
- Memory: tune `--cache_size_mb` on Alpha for query performance; provide enough RAM for hot data.

## Example

A team applying **5. Operations and Architecture** to a Dgraph project treats this guidance as a review gate. It checks whether the current implementation satisfies **Deploy as a cluster: `dgraph-ratel` for the UI, `dgraph zero` for metadata, `dgraph alpha` for data.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for dgraph.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
