# 1. Core Concepts

Focused reference for **graphql-go**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Schema definition in Go**: you build `graphql.Schema` from `graphql.Object`s, field definitions, and resolver functions.
- **Resolvers are plain Go functions**: `Resolve func(p graphql.ResolveParams) (interface{}, error)` returning a value for each field.
- **Arguments** (input) are declared per field via `graphql.ArgumentConfig{ Type: graphql.NewNonNull(graphql.String) }`.
- Queries execute into a response matching requested fields; errors propagate per nullable fields.
