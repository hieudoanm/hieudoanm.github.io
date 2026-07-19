# Android Studio: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] JDK 21 selected for Gradle, set in project config rather than only in Studio
- [ ] `gradle/wrapper/gradle-wrapper.properties` committed; no system Gradle used
- [ ] `gradle/libs.versions.toml` pins AGP, Kotlin, and dependencies
- [ ] AGP version inside the range the team's Studio supports, verified against `compileSdk`
- [ ] `namespace` set per module and no `package` attribute in any manifest
- [ ] `local.properties`, `.idea/`, and `**/build/` in `.gitignore`
- [ ] One AVD per API level and form factor; a physical device available for perf work

## Example

A team applying **Quick-Start Checklist** to a Android Studio project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] JDK 21 selected for Gradle, set in project config rather than only in Studio**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for android-studio-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
