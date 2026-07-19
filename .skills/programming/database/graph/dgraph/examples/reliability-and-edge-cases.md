# Dgraph: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Not declaring indexes in the schema, then wondering why filters do a full scan.
- Over-fetching nested data with deep traversals; add pagination/limits.
- Using DQL where GraphQL suffices — GraphQL is more constrained and easier to maintain.
- Forgetting `@cascade` when you need strict join semantics.
- Ignoring `@upsert` and getting duplicate edges under concurrent mutations.

## Example

A team applying **6. Common Pitfalls** to a Dgraph project treats this guidance as a review gate. It checks whether the current implementation satisfies **Not declaring indexes in the schema, then wondering why filters do a full scan.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for dgraph.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
