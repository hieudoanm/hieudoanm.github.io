---
name: "apache-solr"
description: "Apache Solr — open-source enterprise search platform built on Apache Lucene, with REST APIs, faceting, and distributed search."
tags:
  - "programming"
  - "database"
  - "search"
  - "apache"
  - "solr"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Apache Solr in a project."
prerequisites:
  - "Familiarity with the application’s data model and access patterns."
  - "For implementation, access to the database environment or representative schema."
related_skills:
  - "../elasticsearch/SKILL.md"
  - "../opensearch/SKILL.md"
  - "../../wide-column/apache-cassandra/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Apache Solr is a **mature, extensible enterprise search platform** built on **Apache Lucene**. It exposes **RESTful JSON/**HTTP APIs, powerful **full-text search, faceting, filtering, highlighting, and distributed search** across shards and replicas.

## 1. Core Concepts

- **Index**: Lucene-based; effective for both **full-text** and **exact/range** (plus vector/dense) search.
- **Schema** (managed-schema) defines field types (`text_general`, `string`, `long`, `boolean`, `date`, etc.).
- **Documents** are JSON/XML/Csv indexed per field type.
- **Query via the JSON Request API**: `start`, `rows`, `q`, `fq`, `fl`, `sort`, `facet`, `hl`.
- SolrCloud provides **distributed indexing** with sharding + replication and software load balancing via ZooKeeper.

```json
{
  "q": "title:postgres OR body:indexing",
  "fq": ["status:published", "published_at:[2024-01-01T00:00:00Z TO NOW]"],
  "fl": "id,title,score",
  "sort": "published_at desc",
  "start": 0,
  "rows": 20,
  "facet": { "field": ["category", "author"] },
  "hl": "true",
  "hl.fields": ["title", "body"]
}
```

## 2. Indexing Documents

- Add externally: `POST /solr/collection/update` with JSON documents; batch via commit (`softCommit: true` for near-real-time).
- Schema-less auto-adds fields (string/text) — turn it off in production for predictable analysis.
- Use **Dedup/Atomic updates** via `docValues` and `atomic-updates` for partial field patches.
- Use the **XML/CSV** formats or the ingestion API for user-provided files.

## 3. Querying & Faceting

- Full-text search with Lucene query syntax: `title:apple AND author:"John Doe"`.
- **Faceting**: `facet.field`, `facet.range`, `facet.interval`, `facet.pivot`, `facet.query`.
- **Filter queries (fq)** cache per query in non-distributed mode; reuse `fq`s to raise cache hits.
- Highlighting: `hl=true` + fields; term vectors improve highlight quality.
- Suggested: **Suggesters**, **MoreLikeThis**, **SpellCheck**.

## 4. Schema & Analysis

- Field types belong to an analysis chain (tokenizer + filters) — e.g., `standard`, `keyword`, `n-gram`, `edge-ngram`, `synonym`, `stop`, `stem`.
- Choose between **string** (exact, facetable, sortable) vs **text** (analyzed).
- Use **docValues=true** for faceting/grouping/sorting on large fields for performance.
- **CopyFields** for catch-all search over multiple source fields.

```xml
<field name="id"       type="string" indexed="true" stored="true"/>
<field name="sku"      type="string" indexed="true" stored="true"/>
<field name="category" type="string" indexed="true" stored="false" docValues="true"/>
<field name="author"   type="string" indexed="true" stored="true"    docValues="true"/>
<field name="title"    type="text_general" indexed="true" stored="true">
  <copyField source="title"/>
  <copyField source="summary"/>
</field>
<field name="published_at" type="pdate" indexed="true" stored="true" docValues="true"/>
```

## 5. SolrCloud & Operations

- Deploy ZooKeeper ensemble + Solr nodes; **collections** split into logical shards; replicas per shard.
- Use the **Collections API** (`CREATE`, `SPLITSHARD`, `DELETECOLLECTION`) for lifecycle.
- Configure as many nodes as needed; use `<shard>` aware queries; enable **block join** for parent-child.
- Backups via `REPLICATION`/collection metadata + snapshot; leverage cloud snapshots where possible.
- Cache tuning: `filterCache`, `queryResultCache`, `documentCache` sized to query patterns.

## 6. Common Pitfalls

- Indexing text/general fields that should be `string` for exact sorting/faceting.
- Running schema-less mode in prod — unpredictable field types and analysis.
- Full-`*:*` scans, missing `fq` usage, unbounded `rows`.
- Under-provisioning the ZooKeeper/Cloud layer causing cluster instability.

## General Rules of Thumb

- Define field types and analysis to match how users search, not how data is stored.
- Prefer `fq` with cached filters over modifying the main query.
- Use docValues for faceting/sorting; minimize stored fields you don't need.
- Batch commits with `softCommit=true` for NRT indexing.

## Quick-Start Checklist

- [ ] Define schema with proper field types, copyFields, docValues, analysis.
- [ ] Load documents in batches (JSON post + hard commit for production).
- [ ] Build queries with q + fq, correct fl/sort; check explain/plan for perf.
- [ ] Enable faceting with docValues fields; verify cache sizing.
- [ ] Set up SolrCloud with collections/sharding/replicas.
- [ ] Configure ZooKeeper and monitor node health, replicas, and query latency.
- [ ] Schedule backups and validate restore.
