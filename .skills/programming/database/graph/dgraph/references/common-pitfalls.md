# 6. Common Pitfalls

Focused reference for **dgraph**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Not declaring indexes in the schema, then wondering why filters do a full scan.
- Over-fetching nested data with deep traversals; add pagination/limits.
- Using DQL where GraphQL suffices — GraphQL is more constrained and easier to maintain.
- Forgetting `@cascade` when you need strict join semantics.
- Ignoring `@upsert` and getting duplicate edges under concurrent mutations.
