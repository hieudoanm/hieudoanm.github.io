# apache-solr: Basic Usage

Apache Solr — open-source enterprise search platform built on Apache Lucene, with REST APIs, faceting, and distributed search.

## Scenario

Use this example as a starting point when applying **apache-solr** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
