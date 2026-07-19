# Ionic Framework Best Practices: 2. Project Structure

## Source guidance

This example applies the **2. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Page-based organization** — organize by pages/routes
- **Reusable components** — separate custom components
- **Services for logic** — keep business logic in services
- **Theming** — use Ionic's theming system

## Example

A team applying **2. Project Structure** to a Ionic Framework Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Page-based organization** — organize by pages/routes**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for ionic-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
