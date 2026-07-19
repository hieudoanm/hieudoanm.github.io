# Client: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Create `ApolloClient` + `InMemoryCache`; set up HTTP/WS links.
- [ ] Wrap app tree in `<ApolloProvider>`.
- [ ] Run GraphQL Codegen for typed hooks.
- [ ] Add `typePolicies`/`keyFields` for your models.
- [ ] Use `useQuery`/`useMutation`; add `update`/`refetchQueries`.
- [ ] Add optimistic responses for latency-sensitive flows.
- [ ] Set up `ErrorLink` for global error surfaces.

## Example

A team applying **Quick-Start Checklist** to a Client project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Create `ApolloClient` + `InMemoryCache`; set up HTTP/WS links.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for apollo-client.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
