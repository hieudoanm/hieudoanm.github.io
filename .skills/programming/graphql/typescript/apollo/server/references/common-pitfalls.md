# 7. Common Pitfalls

Focused reference for **apollo-server**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. Common Pitfalls

- Skipping `await server.start()` before `applyMiddleware` → runtime 500s.
- Returning `null` vs throwing for nullable fields (client gets `null` + no error vs error).
- Leaking internal errors via `formatError` default (stack traces).
- Forgetting DataLoader → N+1 avalanche.
- Not validating input beyond SDL types (injection, huge payloads).
