# Android: Common Pitfalls

## Source guidance

This example applies the **Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Collecting flows in `onCreate` without `repeatOnLifecycle`** — work continues in the background and UI shows stale state.
- **`fallbackToDestructiveMigration()` shipping to production** — a schema change deletes every user's local data.
- **Versions hardcoded in module Gradle files** — upgrades drift and reviews become unreadable.
- **Requesting permissions at launch** — a cold permission dialog on first open is the fastest path to denial and to a one-star review.
- **Ignoring edge-to-edge** — content renders under the status bar or notch on Android 15+.
- **`kapt` for new code** — slower than KSP and no longer receiving improvements.

## Example

A team applying **Common Pitfalls** to a Android project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Collecting flows in `onCreate` without `repeatOnLifecycle`** — work continues in the background and UI shows stale state.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for android-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
