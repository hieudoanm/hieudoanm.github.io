# Overview

Focused reference for **opensearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

# OpenSearch Best Practices

OpenSearch is a **search and analytics platform**, not a system of record. Best practice is operationally aware design: mappings before indexing, `text` vs `keyword` separated deliberately, controlled dynamic mappings, the security plugin enabled with least-privilege roles, ISM for lifecycle, and `search_after` over deep pagination.

---

## 1. Core Stack & Constraints

- Assume OpenSearch **2.x** unless specified
- **Do not use OpenSearch as a transactional database**
- **Avoid uncontrolled dynamic mappings**; avoid excessive nested/parent-child relationships
- **Prefer explicit index templates**
- **Avoid wildcard queries on high-cardinality fields**; use `keyword` for filters/aggregations
- Be explicit about **refresh intervals and replicas**
- **Treat cluster-level settings as high risk**

```json
{
  "index_patterns": ["logs-*"],
  "template": {
    "mappings": {
      "properties": {
        "message": { "type": "text" },
        "level": { "type": "keyword" },
        "@ts": { "type": "date" }
      }
    }
  }
}
```
