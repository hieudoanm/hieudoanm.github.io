# 1. Core Concepts

Focused reference for **apache-solr**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
