# Daisyui: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Forgetting to register the plugin → classes not generated.
- Mixing theme prefixes without defining them (errors).
- Overwriting brand tokens after a theme — prefer editing a custom theme config.

## Example

A team applying **6. Common Pitfalls** to a Daisyui project treats this guidance as a review gate. It checks whether the current implementation satisfies **Forgetting to register the plugin → classes not generated.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for daisyui.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
