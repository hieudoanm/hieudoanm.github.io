# apollo-client: Workflow Checklist

A practical run sheet for applying [apollo-client](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **ApolloClient** instance holds the connection (in-memory cache + HTTP/WebSocket link)
- [ ] 1. Core Concepts: **Queries**: useQuery (hook) / useLazyQuery; **Mutations**: useMutation; **Subscriptions**: useSubscription via GraphQLWsLink
- [ ] 2. Setup: Dependencies: @apollo/client (+ graphql), transport: HTTP (HttpLink) or WebSocket (GraphQLWsLink)
- [ ] 2. Setup: Create ApolloClient({ uri, cache: new InMemoryCache({ typePolicies }) })
- [ ] 3. Queries, Variables & Polling: Write queries with **fragments** and **useQuery** for reuse and cache-update safety
- [ ] 3. Queries, Variables & Polling: Pass variables: useQuery(GET_USER, { variables: { id } })
- [ ] 4. Mutations & Optimistic UI: useMutation(MUTATE, { onCompleted, onError })(); call with { variables }
- [ ] 4. Mutations & Optimistic UI: update function mutates the cache after success (read/write query) — keeps UI consistent
- [ ] 5. Cache & Normalization: Normalized cache stores objects by __typename:id keys; keyFields override for composite/synthetic keys
- [ ] 5. Cache & Normalization: Use **field policies** for pagination (read + merge) — e.g., concatPagination/offsetLimitPagination helpers

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
