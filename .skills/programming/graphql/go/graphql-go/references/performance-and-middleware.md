# 5. Performance and Middleware

Focused reference for **graphql-go**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Performance and Middleware

- Add field-level middleware for logging/timing: wrap Resolve functions.
- Use `graphql.Extensions` for Apollo-style federation (via `graphql-go-tools` federation composition).
- Cache: schema is immutable after creation — construct once at startup.
- Cost/limit: analyze queries manually or with `graphql-go` middleware for depth/complexity.
