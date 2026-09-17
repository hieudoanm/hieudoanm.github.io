# Android: 11. Testing

## Source guidance

This example applies the **11. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Split by execution cost**: pure JVM unit tests for domain and ViewModel logic, Robolectric or instrumented tests only where the platform is actually required.
- **Test the ViewModel, not the composable** for state logic — a `StateFlow` assertion is faster and less brittle than a UI test.
- **Always test Room migrations** with `MigrationTestHelper`; a passing app on a fresh install proves nothing about an upgrade path.
- **Use `kotlinx-coroutines-test`** to make coroutine tests deterministic, and inject a `TestDispatcher` rather than relying on real delays.

## Example

A team applying **11. Testing** to a Android project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Split by execution cost**: pure JVM unit tests for domain and ViewModel logic, Robolectric or instrumented tests only where the platform is actually required.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for android-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
