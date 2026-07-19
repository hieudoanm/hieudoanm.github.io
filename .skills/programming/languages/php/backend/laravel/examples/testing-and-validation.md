# Laravel Backend Best Practices: 9. Reliability, Testing & Portability

## Source guidance

This example applies the **9. Reliability, Testing & Portability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test pyramid:**
- Unit tests for domain logic
- Feature tests for HTTP flows
- **Avoid over-mocking Eloquent** — test against a real test DB where invariants matter; stub only external services.
- **Use database factories intentionally** — `User::factory()->create()` in tests, seed data deliberately.
- **Deterministic tests over brittle mocks** — refresh database between tests (`RefreshDatabase`).
- **Portable across FPM, CLI (Artisan), and queues/workers** — domain/services work in all entrypoints.

## Example

A team applying **9. Reliability, Testing & Portability** to a Laravel Backend Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Test pyramid:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for laravel-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
