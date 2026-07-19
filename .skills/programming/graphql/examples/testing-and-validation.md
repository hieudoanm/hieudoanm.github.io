# Graphql: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Design the typed schema (SDL) with queries, mutations, subscriptions as needed.
- [ ] Pick a server: Apollo Server, Mercurius (Fastify), graphql-yoga, graphql-go.
- [ ] Implement resolvers with DataLoader-style batching; avoid N+1.
- [ ] Add validation/limits: depth, aliases, complexity; enable persisted queries for prod.
- [ ] Add pagination (Relay connections recommended) for all list fields.
- [ ] Set up codegen and client caching (Apollo/URQL) — deterministic keys.
- [ ] Instrument per-resolver timing; monitor slow fields.

## Example

A team applying **Quick-Start Checklist** to a Graphql project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Design the typed schema (SDL) with queries, mutations, subscriptions as needed.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for graphql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
