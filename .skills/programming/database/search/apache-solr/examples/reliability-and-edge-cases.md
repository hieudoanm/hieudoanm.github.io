# Apache Solr: 5. SolrCloud & Operations

## Scenario

A project is working on **5. solrcloud & operations** for Apache Solr. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Deploy ZooKeeper ensemble + Solr nodes; **collections** split into logical shards; replicas per shard.
- Use the **Collections API** (`CREATE`, `SPLITSHARD`, `DELETECOLLECTION`) for lifecycle.
- Configure as many nodes as needed; use `<shard>` aware queries; enable **block join** for parent-child.
- Backups via `REPLICATION`/collection metadata + snapshot; leverage cloud snapshots where possible.
- Cache tuning: `filterCache`, `queryResultCache`, `documentCache` sized to query patterns.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. SolrCloud & Operations** section of [SKILL.md](../SKILL.md).
