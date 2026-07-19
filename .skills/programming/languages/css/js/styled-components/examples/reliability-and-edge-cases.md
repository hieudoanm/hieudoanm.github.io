# Styled Components: 6. Performance Notes

## Source guidance

This example applies the **6. Performance Notes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- CSS-in-JS has runtime cost: render passes on every prop change; use memo/PureComponent where possible.
- Consider `styled-components/macro` for combinator/to-something-safe builds.

## Example

A team applying **6. Performance Notes** to a Styled Components project treats this guidance as a review gate. It checks whether the current implementation satisfies **CSS-in-JS has runtime cost: render passes on every prop change; use memo/PureComponent where possible.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for styled-components.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
