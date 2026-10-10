# 3. Loaders (Mercurius DataLoaders)

Focused reference for **mercurius**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Loaders (Mercurius DataLoaders)

- Use **`loaders`** option: `{ User: { posts: async (queries, context) => batchLoad(...) } }` per type-field.

```ts
import { groupBy } from 'lodash-es'

// One batched round-trip per request; results come back in the order the parents were asked for
const loaders = {
  User: {
    posts: async (queries: Array<{ obj: User; args: { first?: number } }>) => {
      const rows = await db.posts.findByAuthorIds(queries.map(({ obj }) => obj.id)) // 1 query, not N
      const byAuthor = groupBy(rows, 'authorId')
      return queries.map(({ obj, args }) => (byAuthor[obj.id] ?? []).slice(0, args.first ?? 10))
    },
  },
}
```

- Loaders **batch + dedupe** per request group (like DataLoader), killing N+1.
- Return arrays matching the queries' `obj` order; handle edge cases (empty queries, nulls).
- Combine with a database `WHERE IN (...)` single round trip.
