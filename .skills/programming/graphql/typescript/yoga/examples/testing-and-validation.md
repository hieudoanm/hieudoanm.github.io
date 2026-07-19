# Yoga: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `npm i graphql-yoga graphql @graphql-tools/schema`.
- [ ] `createSchema(typeDefs, resolvers)` + `createYoga({ schema, context })`.
- [ ] Serve standalone or integrate with Express/Fastify/Hono.
- [ ] Add subscriptions with PubSub + Redis for scale.
- [ ] Add `useResponseCache`, persisted queries for performance.
- [ ] Configure file uploads (`Upload` scalar + body size).
- [ ] Add auth/logging/timing plugins (Envelop).

## Example

A team applying **Quick-Start Checklist** to a Yoga project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `npm i graphql-yoga graphql @graphql-tools/schema`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for yoga.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
