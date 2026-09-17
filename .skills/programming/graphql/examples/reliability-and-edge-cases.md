# Graphql: 4. Performance

## Source guidance

This example applies the **4. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **N+1 problem**: resolvers that fire one DB query per parent row — solve with **DataLoader** (batching + caching per request) or joins in single resolvers.
- **Batching**: DataLoader `loader.load(key)` coalesces concurrent loads per tick.
- Cost/limiting: guard against expensive queries (depth, alias-count, complexity limits) before abuse.
- Use **persisted queries** for high-traffic clients and to reduce HTTP payload.

## Example

```javascript
// One loader per request: created in context, so its cache dies with the request
const userById = new DataLoader(async (ids) => {
  const rows = await db.users.findByIds(ids); // single `WHERE id IN (...)` round trip
  const byId = new Map(rows.map((row) => [row.id, row]));
  return ids.map((id) => byId.get(id) ?? null); // same order as the keys, null for misses
});

const context = { loaders: { userById } };
// Post.author: (post, _args, { loaders }) => loaders.userById.load(post.authorId)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for graphql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
