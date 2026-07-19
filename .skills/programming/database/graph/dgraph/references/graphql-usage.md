# 2. GraphQL Usage

Focused reference for **dgraph**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. GraphQL Usage

- Define types with fields and directives: `@id` for unique fields, `@index(trigram, hash)` for filterable fields.
- Query shapes mirror GraphQL; Dgraph auto-generates resolvers for `filter`, `order`, `first`/`offset`.
- Mutations: `add`, `update`, `delete` with nested mutation support.
- Use `@cascade` to return only fully-joined results; combine with `filter` for required-relations.

```graphql
type User @id @index(hash) @index(trigram) {
  name: String!
  email: String! @unique
  friends: [User] @reverse
}

type Post @id @index(hash) @index(fulltext) @index(term) {
  title: String!
  body: String
  author: User! @reverse
  publishedAt: DateTime @index(hour)
}

mutation placeOrder($input: AddPostInput!) {
  addPost(input: $input) @id {
    posts { id title author { name } }
  }
}
```
