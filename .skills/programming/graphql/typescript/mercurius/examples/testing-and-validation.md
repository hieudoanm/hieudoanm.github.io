# Mercurius: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `npm i fastify mercurius graphql`.
- [ ] Register with schema (SDL/file) + resolvers + context decoration.
- [ ] Add loaders for list-heavy fields; test N+1 gone via logging.
- [ ] Add subscriptions with a scalable pubsub (Redis for multi-instance).
- [ ] Enable federation if multi-service; define `@key` + `resolveReference`.
- [ ] Set `ide: false` in prod; add auth via hooks.
- [ ] Instrument request logging & tracing (Fastify logger / OpenTelemetry).

## Example

A team applying **Quick-Start Checklist** to a Mercurius project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `npm i fastify mercurius graphql`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for mercurius.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
