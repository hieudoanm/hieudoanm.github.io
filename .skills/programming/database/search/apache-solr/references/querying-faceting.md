# 3. Querying & Faceting

Focused reference for **apache-solr**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Querying & Faceting

- Full-text search with Lucene query syntax: `title:apple AND author:"John Doe"`.
- **Faceting**: `facet.field`, `facet.range`, `facet.interval`, `facet.pivot`, `facet.query`.
- **Filter queries (fq)** cache per query in non-distributed mode; reuse `fq`s to raise cache hits.
- Highlighting: `hl=true` + fields; term vectors improve highlight quality.
- Suggested: **Suggesters**, **MoreLikeThis**, **SpellCheck**.
