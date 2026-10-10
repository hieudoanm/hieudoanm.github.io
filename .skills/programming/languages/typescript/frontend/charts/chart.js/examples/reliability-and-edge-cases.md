# Chart.js Best Practices: 6. Performance

## Source guidance

This example applies the **6. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Large datasets: down-sample/aggregate before render (Chart.js is canvas but still rsps).**
- **`decimation` plugin for streaming; `animation: false` for bulk updates.**
- **Reuse chart instances; destroy unused — repeated mounts leak canvas listeners.**

## Example

A team applying **6. Performance** to a Chart.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Large datasets: down-sample/aggregate before render (Chart.js is canvas but still rsps).****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for chart-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
