# Graphql: Starter Template

A reusable starting point derived from the **4. Performance** section of [Graphql](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
