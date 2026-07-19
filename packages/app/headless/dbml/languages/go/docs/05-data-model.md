# dbml (Go) — Data Model

## 1. Purpose

This document defines the internal data model for dbml: the parser AST, generator outputs, and state transitions.

The model must support:

- Table definitions with columns, types, and constraints.
- Primary keys, unique constraints, not null, defaults.
- Foreign key references with direction indicators.
- Enum definitions.
- Indexes (single and composite, unique).
- Table and column notes/comments.
- Project-level metadata.

## 2. Internal AST

The DBML parser builds an internal abstract syntax tree representing:

| Entity | Fields |
| ------ | ------ |
| Project | name, database type |
| Table | name, columns[], notes |
| Column | name, type, constraints[], notes |
| Constraint | type (pk, unique, not_null, default), value |
| Enum | name, values[] |
| Index | name, columns[], unique |
| Reference | from_table, from_column, to_table, to_column, direction |
| Note | entity, entity_name, message |

## 3. Design Principles

1. **Single source of truth**: The internal AST is the single representation used by all generators.
2. **Immutable AST**: Once built, the AST is not mutated; generators walk it read-only.
3. **Explicit constraints**: Every constraint is represented explicitly in the AST.
4. **No database storage**: dbml does not persist data; it converts between formats.

## 4. Output Formats

| Format | Output | File extension |
| ------ | ------ | -------------- |
| SQL | PostgreSQL-compatible DDL | `.sql` |
| Mermaid | `erDiagram` syntax | `.mmd` |
| SVG | Vector graphics | `.svg` |

## 5. State Transitions

```
idle → parsing → generated → complete
             ↘        ↘       ↘
           error    error   error
```

Any non-terminal state may transition to `error`. Terminal states do not leave `complete` or `error`.

## 6. Key Workflows

### 6.1 Parse

DBML source → internal AST, with validation of tables, columns, constraints, and references.

### 6.2 Generate SQL

AST → `CREATE TABLE` statements with constraints and foreign keys.

### 6.3 Generate Mermaid

AST → `erDiagram` syntax with relationships.

### 6.4 Generate SVG

AST → SVG document rendered directly in Go.

## 7. Identifier and Naming Rules

- Table names: preserved from DBML source.
- Column names: preserved from DBML source.
- Constraint names: auto-generated when not specified.
- Index names: auto-generated when not specified.

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- API: [`06-api-specification.md`](06-api-specification.md)
