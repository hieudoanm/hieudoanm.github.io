# MongoDB Best Practices: 2. Data Modeling & Architecture

## Source guidance

This example applies the **2. Data Modeling & Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Model data around **query patterns**, not entities
- **Prefer embedding for one-to-few** relationships; **referencing for many-to-many or large fan-outs**
- Keep documents **self-contained** when possible; avoid `$lookup` unless justified
- Design for **read performance first**
- **Version document schemas explicitly**; use soft deletes intentionally
- Avoid **polymorphic documents** unless well-documented

## Example

A team applying **2. Data Modeling & Architecture** to a MongoDB Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **Model data around **query patterns**, not entities**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mongodb.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
