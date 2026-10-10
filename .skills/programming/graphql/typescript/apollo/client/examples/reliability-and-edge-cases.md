# Client: 8. Common Pitfalls

## Source guidance

This example applies the **8. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Forgetting `keyFields` on types without `id` → wrong cache identity, stale UI.
- Allowing **cache-first** everywhere for volatile data → stale sessions.
- Mutating in `update` without `read/write` — shape mismatch causing console errors.
- N+1 fragments or unnecessary nested queries on large collections.
- Ignoring error `graphQLErrors` in favor of fat network errors.

## Example

A team applying **8. Common Pitfalls** to a Client project treats this guidance as a review gate. It checks whether the current implementation satisfies **Forgetting `keyFields` on types without `id` → wrong cache identity, stale UI.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apollo-client.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
