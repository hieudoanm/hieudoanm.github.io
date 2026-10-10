# 6. Common Pitfalls

Focused reference for **graphql**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Resolver N+1 without batching — the performance cliff.
- Non-null fields propagated on a fragile upstream, causing cascading query failures.
- No limits on depth/aliases, enabling denial-of-service via query cost.
- Schema stubs with no real types: always design the contract first.
- Mutating inside a `Query` field — keep read/write separation.
