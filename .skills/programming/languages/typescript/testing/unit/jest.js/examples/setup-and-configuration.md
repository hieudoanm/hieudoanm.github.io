# Jest Best Practices: 6. Config & CI

## Source guidance

This example applies the **6. Config & CI** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Config minimal:** `testEnvironment` (node/jsdom), `transform` for TS (ts-jest/babel), `setupFilesAfterEach` for globals.
- **`--runInBand`/shards for CI memory; `--ci` treats unexpected as failures; snapshots updated intentionally (`-u`) not blindly.**
- **`describe.only`/`it.only`/`test.only` are debug-only — keep the shipped suite green and unfocused.**

## Example

A team applying **6. Config & CI** to a Jest Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Config minimal:** `testEnvironment` (node/jsdom), `transform` for TS (ts-jest/babel), `setupFilesAfterEach` for globals.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for jest-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
