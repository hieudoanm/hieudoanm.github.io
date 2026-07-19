# Brain.js Best Practices: 6. Testing & Pitfalls

## Source guidance

This example applies the **6. Testing & Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Determinism: same seeds where supported; compare `error` curves in tests.**
- **Golden tests: serialize → load → equal outputs on fixed inputs.**
- **Overfitting: hidden-layer count + validation, not raw accuracy on training.**

## Example

A team applying **6. Testing & Pitfalls** to a Brain.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Determinism: same seeds where supported; compare `error` curves in tests.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for brain-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
