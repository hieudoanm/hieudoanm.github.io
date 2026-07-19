# 5. SolrCloud & Operations

Focused reference for **apache-solr**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. SolrCloud & Operations

- Deploy ZooKeeper ensemble + Solr nodes; **collections** split into logical shards; replicas per shard.
- Use the **Collections API** (`CREATE`, `SPLITSHARD`, `DELETECOLLECTION`) for lifecycle.
- Configure as many nodes as needed; use `<shard>` aware queries; enable **block join** for parent-child.
- Backups via `REPLICATION`/collection metadata + snapshot; leverage cloud snapshots where possible.
- Cache tuning: `filterCache`, `queryResultCache`, `documentCache` sized to query patterns.
