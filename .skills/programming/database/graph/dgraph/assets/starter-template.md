# Dgraph: Starter Template

A reusable starting point derived from the **3. DQL (Native Query Language)** section of [Dgraph](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```graphql
mutation upsertProfile($uid: ID!, $name: String!, $email: String!) {
  updateUser(input: { uid: $uid, set: { name: $name, email: $email } }) @id {
    user {
      id
      name
      email
    }
  }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
