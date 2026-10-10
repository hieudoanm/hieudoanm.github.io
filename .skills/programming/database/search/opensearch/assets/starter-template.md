# OpenSearch Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Constraints** section of [OpenSearch Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
