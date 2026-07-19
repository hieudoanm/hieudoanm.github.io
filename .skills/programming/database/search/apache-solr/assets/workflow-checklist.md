# apache-solr: Workflow Checklist

A practical run sheet for applying [apache-solr](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Index**: Lucene-based; effective for both **full-text** and **exact/range** (plus vector/dense) search
- [ ] 1. Core Concepts: **Schema** (managed-schema) defines field types (text_general, string, long, boolean, date, etc.)
- [ ] 2. Indexing Documents: Add externally: POST /solr/collection/update with JSON documents; batch via commit (softCommit: true for near-real-time)
- [ ] 2. Indexing Documents: Schema-less auto-adds fields (string/text) — turn it off in production for predictable analysis
- [ ] 3. Querying & Faceting: Full-text search with Lucene query syntax: title:apple AND author:"John Doe"
- [ ] 3. Querying & Faceting: **Faceting**: facet.field, facet.range, facet.interval, facet.pivot, facet.query
- [ ] 4. Schema & Analysis: Field types belong to an analysis chain (tokenizer + filters) — e.g., standard, keyword, n-gram, edge-ngram, synonym, stop, stem
- [ ] 4. Schema & Analysis: Choose between **string** (exact, facetable, sortable) vs **text** (analyzed)
- [ ] 5. SolrCloud & Operations: Deploy ZooKeeper ensemble + Solr nodes; **collections** split into logical shards; replicas per shard
- [ ] 5. SolrCloud & Operations: Use the **Collections API** (CREATE, SPLITSHARD, DELETECOLLECTION) for lifecycle

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
