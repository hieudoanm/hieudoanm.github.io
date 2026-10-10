# iOS Development: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `UIScene` lifecycle adopted; no `UIScreen.main` or idiom checks anywhere
- [ ] Usage description keys present for every requested permission; limited access handled
- [ ] `PrivacyInfo.xcprivacy` shipped and consistent with privacy labels
- [ ] Background work via `BGTaskScheduler` with `BGTaskSchedulerPermittedIdentifiers` set
- [ ] Secrets in Keychain; preferences in `AppStorage`; structured data in SwiftData/Core Data
- [ ] `ViewThatFits` / size classes drive layout; Dynamic Type verified at accessibility sizes
- [ ] Glass confined to floating controls, grouped in `GlassEffectContainer`, interactive only when tappable

## Example

A team applying **Quick-Start Checklist** to a iOS Development project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `UIScene` lifecycle adopted; no `UIScreen.main` or idiom checks anywhere**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for ios-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
