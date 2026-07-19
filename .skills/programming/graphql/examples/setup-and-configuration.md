# Graphql: 2. Schema Design

## Source guidance

This example applies the **2. Schema Design** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Compose types, `interface`, `union`, enums, inputs, and scalars.
- Strong typing — each field has a type; nullable vs non-null (`String!`) encodes contract rigor.
- Use **_id / Global Object Identification** convention where useful (Relay spec) for consistent caching and refetching.
- Versioning: evolve instead of version — deprecate with `@deprecated(reason:)` rather than shipping v2 schemas.
- Naming: fields are camelCase by convention; mutations as verbs (`createUser`).

## Example

```graphql
interface Node {
  id: ID!
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}

type User implements Node {
  id: ID!
  name: String!
  role: Role!
  posts(first: Int = 10, after: String): [Post!]!
}

type Post implements Node {
  id: ID!
  title: String!
  author: User! # non-null: a failed resolve nulls the whole Post
}

input CreateUserInput {
  name: String!
  email: String
}

type Query {
  user(id: ID!): User
}
type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for graphql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
