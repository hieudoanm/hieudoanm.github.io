# Better Auth Best Practices: 6. Security & Operations

## Source guidance

This example applies the **6. Security & Operations** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Rate-limit auth endpoints; CSRF-safe cookie flows (library default) verified for the framework.**
- **Secrets rotated; `AUTH_SECRET`/`BETTER_AUTH_SECRET` not committed.**
- **Lighthouse: multi-tenant/SSRF-sensitive flows — trust boundaries documented.**
- **Tests: integration against the pinned version; CI key rotation drill.**

## Example

A team applying **6. Security & Operations** to a Better Auth Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Rate-limit auth endpoints; CSRF-safe cookie flows (library default) verified for the framework.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for better-auth-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
