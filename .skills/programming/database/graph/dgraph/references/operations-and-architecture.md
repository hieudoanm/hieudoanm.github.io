# 5. Operations and Architecture

Focused reference for **dgraph**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Operations and Architecture

- Deploy as a cluster: `dgraph-ratel` for the UI, `dgraph zero` for metadata, `dgraph alpha` for data.
- Horizontal scale via `--shards N` and `--replicas R`; data is split across Alpha groups.
- Bulk-loading: use `dgraph live` or `bulk` to load from RDF/JSON/RDF-Quad files; for production, use `bulk` to pre-split, then `live`.
- Backups: `dgraph backup` to S3/GCS/local; restore with `dgraph restore`.
- Memory: tune `--cache_size_mb` on Alpha for query performance; provide enough RAM for hot data.
