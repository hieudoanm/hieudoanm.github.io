# 2. Indexing Documents

Focused reference for **apache-solr**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Indexing Documents

- Add externally: `POST /solr/collection/update` with JSON documents; batch via commit (`softCommit: true` for near-real-time).
- Schema-less auto-adds fields (string/text) — turn it off in production for predictable analysis.
- Use **Dedup/Atomic updates** via `docValues` and `atomic-updates` for partial field patches.
- Use the **XML/CSV** formats or the ingestion API for user-provided files.
