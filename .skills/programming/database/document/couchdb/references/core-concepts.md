# 1. Core Concepts

Focused reference for **couchdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Documents** are JSON objects stored under a unique `_id` with a `_rev` (revision) token.
- **Databases** are collections of documents; views/indexes are per-database.
- **Replication** synchronizes databases between nodes or clients continuously or on demand.
- **MVCC**: document revisions are immutable; conflicts are resolved by application merge logic or by picking the latest valid revision.
- **Query via views**, defined as map/reduce functions written in JavaScript. Live listing with `_changes` and filtering with `_selector` (Mango).
