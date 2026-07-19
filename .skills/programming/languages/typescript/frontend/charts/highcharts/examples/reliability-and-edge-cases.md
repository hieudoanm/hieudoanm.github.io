# Highcharts Best Practices: 6. Performance

## Source guidance

This example applies the **6. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Aggregate before render; `animation: false` for initial load of dense series.**
- **Limit series/points for the view; `turboThreshold` raised deliberately with bounded data.**
- **Rendering atomic: build the full options object once, then chart it (no per-frame `update`).**

## Example

A team applying **6. Performance** to a Highcharts Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Aggregate before render; `animation: false` for initial load of dense series.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for highcharts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
