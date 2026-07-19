# Rails Backend Best Practices: 8. Reliability, Testing & Portability

## Source guidance

This example applies the **8. Reliability, Testing & Portability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test pyramid:**
- Unit tests for POROs
- Model tests for invariants
- Request/system tests for flows
- **Avoid brittle controller-only tests** — test behavior through requests/feature tests.
- **Use factories intentionally** (FactoryBot) — consistent fixtures, deliberate creates; avoid test-only setup drift.
- **Deterministic tests over heavy mocking** — real DB where invariants matter; stubs for external services.

## Example

A team applying **8. Reliability, Testing & Portability** to a Rails Backend Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Test pyramid:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for rails-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
