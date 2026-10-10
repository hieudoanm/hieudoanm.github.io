# 6. Performance & Monitoring

Focused reference for **apollo-server**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Performance & Monitoring

- Use `@apollo/server` tracing: `tracing: { includeUnusedVariables }`, `engine`/reporting to Apollo Studio (or Prometheus).
- Persisted queries for safe, cheap, high-traffic clients.
- **Batching**: enable `batchEnabled: true` in `applyMiddleware` (send multiple ops) — but usually N-1 queries are the issue; fix with DataLoader.
- Set sensible `VARIABLES`/payload limits; enable `csrfPrevention` and `logger`.
