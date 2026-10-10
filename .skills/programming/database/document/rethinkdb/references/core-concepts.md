# 1. Core Concepts

Focused reference for **rethinkdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Tables** hold JSON documents; documents are like rows with flexible schemas.
- **Databases** group tables; each table can be sharded and replicated per shard.
- **ReQL** is a fluent, chainable query language available in first-class drivers (JS, Python, Java, Ruby) — queries are composed programmatically, not as strings.
- **Changefeeds** allow subscribing to inserts/updates/deletes/validation results on a table or query result.
- Secondary indexes accelerate queries; primary index is by document `id`.
