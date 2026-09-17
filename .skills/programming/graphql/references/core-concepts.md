# 1. Core Concepts

Focused reference for **graphql**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **Schema**: the contract — types, fields, and relationships, written in SDL (Schema Definition Language).
- **Resolver**: server function per field that returns data for that field, with types enforced by the framework.

```javascript
// graphql-js style: one function per field, grouped by the type that owns the field
const resolvers = {
  Query: {
    user: (_parent, { id }, { loaders }) => loaders.userById.load(id),
  },
  Mutation: {
    createUser: (_parent, { input }, { userService }) =>
      userService.create(input),
  },
  Subscription: {
    postAdded: {
      subscribe: (_parent, { authorId }, { pubSub }) =>
        pubSub.subscribe(`posts:${authorId}`),
    },
  },
};
```

- **Query / Mutation / Subscription**: three root operation types.
- **No over/under-fetching**: response mirrors the requested shape.
- **Introspection**: clients and tools can query the schema itself for autocomplete/documentation.
