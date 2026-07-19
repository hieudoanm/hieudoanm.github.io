# Google Charts Best Practices: 6. Performance & Load

## Source guidance

This example applies the **6. Performance & Load** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Hosted library — network weight; lazy-load the package on view:**
- **Aggregate data before render (wide tables = slow); cap rows for dashboards.**
- **Version-pin the loader revision to prevent drift surprises.**

## Example

A team applying **6. Performance & Load** to a Google Charts Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Hosted library — network weight; lazy-load the package on view:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for google-charts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
