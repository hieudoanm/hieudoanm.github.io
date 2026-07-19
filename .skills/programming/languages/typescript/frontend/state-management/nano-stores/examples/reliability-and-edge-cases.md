# Nano Stores Best Practices: 6. Performance & Scaling

## Source guidance

This example applies the **6. Performance & Scaling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Granular stores = granular subscriptions** — a single mega-store re-renders everything on any change.
- **Derived values via `computed`, not per-render computation.**
- **Hundreds of small stores are fine; deep fragmentation of one concept is not.** Name stores by domain noun (`cartItems`, `sessionUser`), not scaffolding.

## Example

A team applying **6. Performance & Scaling** to a Nano Stores Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Granular stores = granular subscriptions** — a single mega-store re-renders everything on any change.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for nano-stores-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
