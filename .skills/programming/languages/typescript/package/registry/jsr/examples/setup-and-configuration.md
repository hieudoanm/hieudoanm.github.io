# JSR Best Practices: 2. Source-First Structure

## Source guidance

This example applies the **2. Source-First Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **JSR publishes TS/JS source (compiled at use) — no build artifact worship:**
- **Explicit `publish.exclude` keeps tests/docs private to the package.**
- **Dependency specifiers `jsr:` (other JSR) or `npm:` (npm interop) both valid — JSR resolves at install.**

## Example

A team applying **2. Source-First Structure** to a JSR Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****JSR publishes TS/JS source (compiled at use) — no build artifact worship:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for jsr-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
