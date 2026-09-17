# OpenSearch Best Practices: Basic Usage

Best practices for designing indexes, queries, and operations with OpenSearch (search and analytics). Use when writing mappings, building queries/aggregations, configuring Index State Management, tuning shards, or planning upgrades — covers the security plugin, ISM, snapshots, and cluster stability.

## Scenario

Use this example as a starting point when applying **opensearch** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
