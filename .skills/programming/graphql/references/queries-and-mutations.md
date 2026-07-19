# 3. Queries and Mutations

Focused reference for **graphql**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Queries and Mutations

- Query example: `{ user(id: 1) { name email posts { title } } }`.
- Mutations are designed with an **input and output pattern**: `mutation { createUser(input: {...}) { user { id name } } }`.

```graphql
query GetUserWithPosts($id: ID!, $first: Int = 10) {
  user(id: $id) {
    id
    name
    posts(first: $first) {
      id
      title
    } # the response mirrors the request
  }
}

mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
  }
}
```

- **Arguments** everywhere: filtering, pagination via `first`/`after` (cursor-based) or `offset`/`limit`.
- **Connections** (Relay) standardize pagination with edges/nodes/pageInfo.
- **Null propagation**: a non-null field error bubbles to the nearest nullable ancestor.
