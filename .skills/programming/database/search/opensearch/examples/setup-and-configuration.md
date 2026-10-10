# OpenSearch Best Practices: 2. Indexing & Data Modeling

## Source guidance

This example applies the **2. Indexing & Data Modeling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Design mappings before indexing data**
- **Separate `text` and `keyword` intentionally**; choose analyzers per language/behavior
- **Avoid mapping explosions** from unbounded field names
- **Prefer denormalization over joins**
- **Control shard count deliberately**; use **index aliases for versioning and migrations**
- **Plan re-indexing as a normal lifecycle operation**

## Example

A team applying **2. Indexing & Data Modeling** to a OpenSearch Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Design mappings before indexing data****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for opensearch.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
