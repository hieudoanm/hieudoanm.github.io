# JavaScript Best Practices: 4. Errors

## Source guidance

This example applies the **4. Errors** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Throw descriptive Errors; subclass for domain errors (`class RateLimitError extends Error`).**
- **Catch and rethrow with context (cause chains) — don't swallow types.**
- **Validate inputs at boundaries (functions/APIs); assert invariants early with clear messages.**

## Example

A team applying **4. Errors** to a JavaScript Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Throw descriptive Errors; subclass for domain errors (`class RateLimitError extends Error`).****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for javascript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
