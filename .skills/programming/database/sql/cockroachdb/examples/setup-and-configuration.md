# CockroachDB Best Practices: 2. Data Modeling & Architecture

## Source guidance

This example applies the **2. Data Modeling & Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Avoid monotonically increasing primary keys**; prefer UUIDs / well-distributed keys
- Design schemas to **reduce contention**
- Denormalize only when justified
- **Be careful with foreign keys in high-write paths** (parent/child contention)
- Plan schema changes explicitly
- **Design indexes for distributed execution**; consider **regional tables and locality**

## Example

A team applying **2. Data Modeling & Architecture** to a CockroachDB Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Avoid monotonically increasing primary keys**; prefer UUIDs / well-distributed keys**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for cockroachdb.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
