# Mercurius: 6. Error & Plugins

## Source guidance

This example applies the **6. Error & Plugins** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Use Fastify plugins for logging (`fastify.log.info`), auth hooks, rate limiting.
- Error handling: wrap resolvers; Mercurius exposes `onError` hook for mutation or per-run formatting.
- Disable IDE in prod (`ide: false`); add CSRF/`rootValue` protections.

## Example

A team applying **6. Error & Plugins** to a Mercurius project treats this guidance as a review gate. It checks whether the current implementation satisfies **Use Fastify plugins for logging (`fastify.log.info`), auth hooks, rate limiting.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for mercurius.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
