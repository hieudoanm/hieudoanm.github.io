# Yarn Best Practices: 6. Security & CI

## Source guidance

This example applies the **6. Security & CI** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`yarn audit` wired into CI (fail on high); `yarn outdated` quarterly.**
- **`--cascade` store/cache in CI (`.yarn/cache` committed for PnP zero-install); auth tokens env-scoped, none inline.**
- **`yarn constraints` for package.json lint (Modern) — catches drift declaratively.**

## Example

A team applying **6. Security & CI** to a Yarn Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****`yarn audit` wired into CI (fail on high); `yarn outdated` quarterly.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for yarn-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
