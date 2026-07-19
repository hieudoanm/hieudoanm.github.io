# Graphql Go: 5. Performance and Middleware

## Source guidance

This example applies the **5. Performance and Middleware** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Add field-level middleware for logging/timing: wrap Resolve functions.
- Use `graphql.Extensions` for Apollo-style federation (via `graphql-go-tools` federation composition).
- Cache: schema is immutable after creation — construct once at startup.
- Cost/limit: analyze queries manually or with `graphql-go` middleware for depth/complexity.

## Example

A team applying **5. Performance and Middleware** to a Graphql Go project treats this guidance as a review gate. It checks whether the current implementation satisfies **Add field-level middleware for logging/timing: wrap Resolve functions.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for graphql-go.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
