# 1. Core Concepts

Focused reference for **couchbase**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Buckets** are the top-level containers (like databases) that hold documents.
- **Scopes and collections** (Couchbase Server 7+) provide hierarchical organization within a bucket, analogous to schemas/tables.
- **Documents** are JSON payloads with a unique key per collection.
- **N1QL** is the SQL-like query language for JSON, supporting joins, indexes, and subqueries.
- **Indexes** are required for N1QL queries other than primary-key lookups; build them explicitly.
