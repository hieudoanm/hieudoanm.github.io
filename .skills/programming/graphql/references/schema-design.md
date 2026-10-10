# 2. Schema Design

Focused reference for **graphql**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Schema Design

- Compose types, `interface`, `union`, enums, inputs, and scalars.

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

- Strong typing — each field has a type; nullable vs non-null (`String!`) encodes contract rigor.
- Use **_id / Global Object Identification** convention where useful (Relay spec) for consistent caching and refetching.
- Versioning: evolve instead of version — deprecate with `@deprecated(reason:)` rather than shipping v2 schemas.
- Naming: fields are camelCase by convention; mutations as verbs (`createUser`).
