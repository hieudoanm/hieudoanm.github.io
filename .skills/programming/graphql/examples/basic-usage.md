# graphql: Basic Usage

GraphQL — query language and runtime for APIs that lets clients request exactly the data they need through a typed schema.

## Scenario

Use this example as a starting point when applying **graphql** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```javascript
// graphql-js style: one function per field, grouped by the type that owns the field
const resolvers = {
  Query: {
    user: (_parent, { id }, { loaders }) => loaders.userById.load(id),
  },
  Mutation: {
    createUser: (_parent, { input }, { userService }) =>
      userService.create(input),
  },
  Subscription: {
    postAdded: {
      subscribe: (_parent, { authorId }, { pubSub }) =>
        pubSub.subscribe(`posts:${authorId}`),
    },
  },
};
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
