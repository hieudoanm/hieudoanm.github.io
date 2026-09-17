# SQLite Best Practices: 2. Data Modeling & Architecture

## Source guidance

This example applies the **2. Data Modeling & Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Normalize unless denormalization is justified**
- Use proper primary keys — `INTEGER PRIMARY KEY` when appropriate, UUIDs when portability matters
- Avoid oversized tables with unindexed queries; prefer **simple schemas over clever tricks**
- Design schemas for **read patterns**
- Avoid **JSON blobs unless intentionally chosen**
- **Version schema migrations explicitly** — treat schema changes as real migrations

## Example

A team applying **2. Data Modeling & Architecture** to a SQLite Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Normalize unless denormalization is justified****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for sqlite.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
