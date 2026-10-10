# Elasticsearch Best Practices: Basic Usage

Best practices for designing indexes, queries, and clusters with Elasticsearch (search and analytics). Use when writing mappings, building search queries/aggregations, tuning shards, planning migrations/re-indexing, or debugging slow searches — treats ES as a search engine, not a system of record.

## Scenario

Use this example as a starting point when applying **elasticsearch** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "mappings": {
    "properties": {
      "title":   { "type": "text" },
      "status":  { "type": "keyword" },
      "price":   { "type": "double" },
      "created": { "type": "date" }
    }
  }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
