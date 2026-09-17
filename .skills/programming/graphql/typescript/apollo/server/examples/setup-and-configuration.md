# Server: 2. Schema & Resolvers

## Source guidance

This example applies the **2. Schema & Resolvers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **typeDefs**: SDL via `gql` template literal (Tagged template with the `graphql` package) or a schema string.
- **resolvers**: object mapping field to functions; type-wise, return promises for async work.
- Groups by type: `Query`, `Mutation`, plus per-type resolvers for nested fields (avoid N+1).
- **Arguments/inputs**: validate via SDL types; non-null (`!`) where required.
- **Context**: per-request object (auth user, DB client, DataLoaders) from `context: async ({ req }) => ({ user, loaders })`.

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
input CreateUserInput {
  name: String!
  email: String!
}
type Query {
  user(id: ID!): User
}
type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apollo-server.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
