# 7. Common Pitfalls

Focused reference for **yoga**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. Common Pitfalls

- Using `graphql-yoga` v2 API with v3 (access `yoga.fetch`/`yoga.handleRequest` instead of legacy `handleRequest` in newer major versions).
- Forgetting subscriptions' async iterator errors are swallowed without logging.
- Uploads hitting default body size limits without configuring body size in the HTTP layer.
- Mixing SSE and WS semantics without knowing the client supports them.
