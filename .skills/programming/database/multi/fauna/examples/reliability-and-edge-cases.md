# Fauna: 5. Operations and Deployment

## Source guidance

This example applies the **5. Operations and Deployment** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- It is a managed service — no installation; use the web dashboard or CLI (`fauna` npm).
- Driver: official `fauna-js` (ESM, `FQL`, or legacy `fql-lite`).
- Deploy code with `fauna`/`fauna shell`; use respitory connection via the dashboard env vars.
- Backups: Fauna has automatic rollback/windowing; configure retention settings.

## Example

A team applying **5. Operations and Deployment** to a Fauna project treats this guidance as a review gate. It checks whether the current implementation satisfies **It is a managed service — no installation; use the web dashboard or CLI (`fauna` npm).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for fauna.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
