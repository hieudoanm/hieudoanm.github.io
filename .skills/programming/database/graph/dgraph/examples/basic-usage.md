# dgraph: Basic Usage

Dgraph — distributed graph database with native GraphQL and DQL query support, built on a transactional key-value store.

## Scenario

Use this example as a starting point when applying **dgraph** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. GraphQL Usage** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
