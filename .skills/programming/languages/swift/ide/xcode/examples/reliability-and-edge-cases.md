# Xcode: 10. Common Pitfalls

## Source guidance

This example applies the **10. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Opening the `.xcodeproj` instead of the `.xcworkspace`**, making packages and pods appear missing.
- **Committing `xcuserdata`**, which produces per-user diff noise on every machine.
- **Configuration set in the IDE instead of an `.xcconfig`**, invisible to review and lost in merge conflicts.
- **Forgetting `$(inherited)`** in a target-level override, silently dropping inherited flags.
- **Sharing the wrong scheme**, or not sharing it at all, so a build variant only exists on one machine.
- **An unshared scheme with a stale launch argument** making a staging build look broken.

## Example

A team applying **10. Common Pitfalls** to a Xcode project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Opening the `.xcodeproj` instead of the `.xcworkspace`**, making packages and pods appear missing.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for xcode-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
