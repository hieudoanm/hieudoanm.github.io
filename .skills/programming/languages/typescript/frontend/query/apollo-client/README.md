# Apollo Client Best Practices

Apollo Client is **the GraphQL client for React** — ApolloProvider + useQuery/useMutation with a normalized cache. Practical Apollo leans on **declarative useQuery per view (with fetchPolicy deliberate), mutations useMutation + cache update strategy (refetchQueries vs update), fragment reuse (gql strings modularized), and cache normalization understood (id)**, with error/loading states explicit — GraphQL gives you control;...

## When to use

Use when writing, structuring, or reviewing Apollo Client.

## Core topics

- 1. Setup & Client
- 2. Queries
- 3. Mutations
- 4. Fragments & Schemas
- 5. Cache & Normalization
- 6. Performance & DevTools

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Apollo Client Best Practices: Basic Usage](./examples/basic-usage.md)
- [Apollo Client Best Practices: 6. Performance & DevTools](./examples/reliability-and-edge-cases.md)
- [Apollo Client Best Practices: 4. Fragments & Schemas](./examples/setup-and-configuration.md)
- [Apollo Client Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Apollo Client Best Practices: Decision Record](./assets/decision-record.md)
- [Apollo Client Best Practices: Starter Template](./assets/starter-template.md)
- [Apollo Client Best Practices: Validation Plan](./assets/validation-plan.md)
- [Apollo Client Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
