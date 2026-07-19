# ml5.js Best Practices: 6. Ethics & Pitfalls

## Source guidance

This example applies the **6. Ethics & Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pretrained biases documented — model cards/caveats acknowledged in projects.**
- **No real-time personal data storage without consent; demos sanitized.**
- **Version pin `ml5` + TensorFlow deps; tests machine hands-down only (no visual asserts).**

## Example

A team applying **6. Ethics & Pitfalls** to a ml5.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Pretrained biases documented — model cards/caveats acknowledged in projects.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for ml5-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
