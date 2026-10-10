# Nuxt Best Practices: 2. Project Structure

## Source guidance

This example applies the **2. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Auto-imports** — components and composables are auto-imported
- **File-based routing** — pages in `pages/` become routes
- **Server routes** — API routes in `server/api/`
- **Convention over configuration** — follow Nuxt's conventions

## Example

A team applying **2. Project Structure** to a Nuxt Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Auto-imports** — components and composables are auto-imported**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nuxt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
