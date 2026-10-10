# MySQL Best Practices: 2. Data Modeling & Architecture

## Source guidance

This example applies the **2. Data Modeling & Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Normalize unless denormalization is justified**
- Use proper data types — avoid oversized `VARCHAR` and misuse of `TEXT`
- **Index based on query patterns**, not entity attributes
- Use **foreign keys intentionally** (never accidentally)
- Avoid polymorphic or ambiguous schemas
- Design schemas for the **read and write paths** together

## Example

A team applying **2. Data Modeling & Architecture** to a MySQL Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Normalize unless denormalization is justified****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mysql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
