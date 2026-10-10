# 7. Common Pitfalls

Focused reference for **mercurius**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. Common Pitfalls

- Forgetting `loaders` config → N+1 resolver storms on lists.
- Async resolver violating single-instance pubsub (Redis adapter needed in multi-node).
- Not decorating context in a Fastify-friendly way (decorate + expose instance).
- Not enabling `federationMetadata` before adding `@key` types.
