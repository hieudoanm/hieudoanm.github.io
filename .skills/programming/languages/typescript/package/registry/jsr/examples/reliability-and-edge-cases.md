# JSR Best Practices: 6. Hygiene & Security

## Source guidance

This example applies the **6. Hygiene & Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Token least-privilege; never commit `.env`/tokens.**
- **`jsr publish` provenance-updated for hardening (`SAST` in CI).**
- **Deprecate versions deliberately; keep exports stable (semver discipline).**
- **Docs meta (readme/`deno task doc`) shipped with the package.**

## Example

A team applying **6. Hygiene & Security** to a JSR Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Token least-privilege; never commit `.env`/tokens.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for jsr-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
