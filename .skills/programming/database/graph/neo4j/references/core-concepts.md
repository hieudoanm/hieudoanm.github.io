# 1. Core Concepts

Focused reference for **neo4j**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Nodes** represent entities; they can carry labels and key-value properties.
- **Relationships** are first-class objects connecting exactly two nodes (direction + type) with their own properties.
- **Labels** categorize nodes (e.g., `:User`, `:Product`); indexes are built per label and property.
- **Cypher** is a declarative, pattern-matching query language; queries read as ASCII-art graph patterns.
- **Schema**: optional, enforced via **constraints** (`UNIQUE`, `NOT NULL`, `EXISTS`) and **indexes**; you can start without a schema.
