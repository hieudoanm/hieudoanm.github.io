# Apollo Client Best Practices: 6. Performance & DevTools

## Source guidance

This example applies the **6. Performance & DevTools** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Bundle/fetch: `@apollo/client` fused; persisted queries where hot.**
- **React Profiler + Apollo DevTools for cache shapes; `gql` modularized so only used fields ship.**
- **End-to-end: typed hooks (`@graphql-codegen`) reduce string-drift — codegen on schema changes.**

## Example

A team applying **6. Performance & DevTools** to a Apollo Client Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Bundle/fetch: `@apollo/client` fused; persisted queries where hot.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apollo-client-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
