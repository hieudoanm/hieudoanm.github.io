# 2. Schema & Resolvers

Focused reference for **mercurius**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Schema & Resolvers

- **Schema** can be SDL string, file, or `buildSchema` programmatically.

```graphql
type User {
  id: ID!
  name: String!
  posts(first: Int = 10, after: String): [Post!]!
}
type Post {
  id: ID!
  title: String!
  author: User!
}
input CreatePostInput {
  title: String!
  authorId: ID!
}
type Query {
  user(id: ID!): User
}
type Mutation {
  createPost(input: CreatePostInput!): Post!
}
```

- **Resolvers** map: `{ Query: { users: async () => [...] } }`.
- Fast path `fastify.graphql(query, variables)` for direct in-route calls.
- Context: build a Fastify-native hook (`onRequest`) to inject `app.decorate('graphqlContext')` for auth, DB access.
