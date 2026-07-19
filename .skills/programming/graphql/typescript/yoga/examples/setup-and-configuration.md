# Yoga: 3. Schema & Resolvers

## Source guidance

This example applies the **3. Schema & Resolvers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Use `createSchema({ typeDefs, resolvers })` for schema-first; or `GraphQLSchema` directly.
- Resolvers: plain JS/TS objects; async anywhere; args/context injected.
- Context: build from `context: async ({ request, params }) => ({ user, loaders })`.
- Add middleware via plugins: `useLogger`, `useTiming`, `useAuth`, `useResponseCache`, `useGraphiQL`.

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
  posts(first: Int = 10, after: String): [Post!]!
}
type Mutation {
  createPost(input: CreatePostInput!): Post!
}
type Subscription {
  postAdded(authorId: ID!): Post!
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for yoga.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
