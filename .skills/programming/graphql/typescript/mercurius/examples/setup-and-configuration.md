# Mercurius: 2. Schema & Resolvers

## Source guidance

This example applies the **2. Schema & Resolvers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Schema** can be SDL string, file, or `buildSchema` programmatically.
- **Resolvers** map: `{ Query: { users: async () => [...] } }`.
- Fast path `fastify.graphql(query, variables)` for direct in-route calls.
- Context: build a Fastify-native hook (`onRequest`) to inject `app.decorate('graphqlContext')` for auth, DB access.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mercurius.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
