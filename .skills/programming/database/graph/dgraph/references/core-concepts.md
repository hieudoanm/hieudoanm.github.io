# 1. Core Concepts

Focused reference for **dgraph**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- Data is stored as **triples**: subject → predicate → object, forming a native graph without a separate schema layer.
- **GraphQL** is the recommended query/mutation interface; DQL is the lower-level native language.
- **Schema** is defined via GraphQL SDL or DQL `schema{}`; indexes are declared in the schema, not inferred.
- **Transactions**: Dgraph supports optimistic ACID transactions (`@upsert` for edge upserts) — use `@id` for GraphQL to enable upsertable unique fields.
- **Alpha and Zero** processes: Zero manages the cluster metadata and transactions; Alpha holds the data shards.
