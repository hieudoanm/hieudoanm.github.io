# Sass: 8. Common Pitfalls

## Source guidance

This example applies the **8. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Using legacy `@import` (global namespace pollution) instead of `@use`/`@forward`.
- Over-nesting/`@extend` chains that balloon specificity and output size.
- Mixing unit arithmetic without `strip-unit`/math helpers.
- Assuming media-query + variable values are interpolated everywhere (works in Dart Sass).

## Example

A team applying **8. Common Pitfalls** to a Sass project treats this guidance as a review gate. It checks whether the current implementation satisfies **Using legacy `@import` (global namespace pollution) instead of `@use`/`@forward`.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for sass.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
