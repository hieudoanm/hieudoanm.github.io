# 6. Performance & Caching

Focused reference for **yoga**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Performance & Caching

- Use `useResponseCache` plugin (automatic) for GET-side caching.
- Enable persisted queries: `usePersistedOperations`.
- Compose with `@graphql-tools/stitching`/`merge` for modular schemas.
