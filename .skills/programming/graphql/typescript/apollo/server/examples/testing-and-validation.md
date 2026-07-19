# Server: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `npm i @apollo/server graphql`; scaffold server (standalone or Express integration).
- [ ] Design typeDefs (SDL) with proper nullability & directives.
- [ ] Implement resolvers + context (auth, DB, DataLoaders).
- [ ] Add `formatError` (no stack leaks) and typed Apollo errors.
- [ ] Enable CSRF prevention and payload/query limits.
- [ ] Add response cache plugin and persisted queries for high traffic.
- [ ] Wire DataLoader per request to prevent N+1.

## Example

A team applying **Quick-Start Checklist** to a Server project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `npm i @apollo/server graphql`; scaffold server (standalone or Express integration).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for apollo-server.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
