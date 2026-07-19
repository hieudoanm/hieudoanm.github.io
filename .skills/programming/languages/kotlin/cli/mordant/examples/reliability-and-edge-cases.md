# Mordant Best Practices: 11. Common Pitfalls

## Source guidance

This example applies the **11. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Use the source section as the governing checklist and adapt its decisions to the project constraints.

## Example

A team applying **11. Common Pitfalls** to a Mordant Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **the project-specific recommendations in the 11. Common Pitfalls guidance**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for mordant-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
