# 8. Common Pitfalls

Focused reference for **apollo-client**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 8. Common Pitfalls

- Forgetting `keyFields` on types without `id` → wrong cache identity, stale UI.
- Allowing **cache-first** everywhere for volatile data → stale sessions.
- Mutating in `update` without `read/write` — shape mismatch causing console errors.
- N+1 fragments or unnecessary nested queries on large collections.
- Ignoring error `graphQLErrors` in favor of fat network errors.
