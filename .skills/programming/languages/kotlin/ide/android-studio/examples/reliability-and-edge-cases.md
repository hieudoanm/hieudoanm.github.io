# Android Studio: 10. Common Pitfalls

## Source guidance

This example applies the **10. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Building only in Studio**, with a sync setting or plugin version that no CI job has.
- **A local `gradle`/`sdk` version outside the wrapper**, so the build server fails.
- **Committing `local.properties`**, which hard-codes one machine's SDK path.
- **Profiling the Debug build**, where overhead makes CPU numbers meaningless — use `profile`.
- **Only ever testing on an emulator** and shipping a startup or graphics regression.
- **Testing release without R8 shrinking enabled**, then discovering a `ClassNotFoundException` or stripped reflection in production.

## Example

A team applying **10. Common Pitfalls** to a Android Studio project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Building only in Studio**, with a sync setting or plugin version that no CI job has.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for android-studio-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
