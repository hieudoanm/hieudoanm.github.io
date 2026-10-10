# Yoga: 7. Common Pitfalls

## Source guidance

This example applies the **7. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Using `graphql-yoga` v2 API with v3 (access `yoga.fetch`/`yoga.handleRequest` instead of legacy `handleRequest` in newer major versions).
- Forgetting subscriptions' async iterator errors are swallowed without logging.
- Uploads hitting default body size limits without configuring body size in the HTTP layer.
- Mixing SSE and WS semantics without knowing the client supports them.

## Example

A team applying **7. Common Pitfalls** to a Yoga project treats this guidance as a review gate. It checks whether the current implementation satisfies **Using `graphql-yoga` v2 API with v3 (access `yoga.fetch`/`yoga.handleRequest` instead of legacy `handleRequest` in newer major versions).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for yoga.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
