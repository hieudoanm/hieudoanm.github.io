# Apollo Client Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `ApolloClient` + typed `InMemoryCache`; link auth via setContext
- [ ] `useQuery` per view; loading/error/refetch states mapped
- [ ] `useMutation` + cache strategy (refetchQueries vs `update`)
- [ ] Fragments colocated/reused; `PossibleTypes`/codegen
- [ ] `typePolicies` for keys/merges; `id` always fetched
- [ ] Optimistic UI + rollback; DevTools checked; bundles lean

## Example

A team applying **Quick-Start Checklist** to a Apollo Client Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `ApolloClient` + typed `InMemoryCache`; link auth via setContext**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for apollo-client-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
