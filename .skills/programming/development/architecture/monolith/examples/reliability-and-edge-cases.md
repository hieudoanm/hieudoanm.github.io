# Monolithic Architecture Best Practices: 9. Security

## Source guidance

This example applies the **9. Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Authentication** — implement authentication mechanism
- **Authorization** — implement role-based access control
- **Input validation** — validate all input
- **Secure communication** — use HTTPS
- **Secrets management** — manage secrets securely

## Example

A team applying **9. Security** to a Monolithic Architecture Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Authentication** — implement authentication mechanism**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for monolith-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
