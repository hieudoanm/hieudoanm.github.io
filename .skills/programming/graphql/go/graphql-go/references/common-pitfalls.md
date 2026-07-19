# 6. Common Pitfalls

Focused reference for **graphql-go**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Type assertions on `p.Args["x"]` crashing if type differs → validate via the declared arg types.
- N+1 resolves by synchronous load per parent.
- Ignoring `result.Errors` when executing — client receives 500s with minimal detail.
- Missing `graphql.NewNonNull` on required args → silently coerced to null.
