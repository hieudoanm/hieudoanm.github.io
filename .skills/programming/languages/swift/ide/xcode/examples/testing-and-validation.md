# Xcode: 8. Previews & Refactoring

## Source guidance

This example applies the **8. Previews & Refactoring** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **SwiftUI previews are a live compile, not a screenshot.** A type error in the previewed view is a real error in that view.
- **Use `#Preview` and keep previews at the bottom of a file**, or in a `Previews` folder excluded from the release target.
- **Preview sample data in one place.** A `SampleData` enum or a `PreviewProvider` shared across views stops each preview inventing its own inconsistent model.
- **The refactor menu is Roslyn-backed and reliable** for rename (it updates strings, XIB outlets, and Swift name references), extract, and convert closures to async.

## Example

A team applying **8. Previews & Refactoring** to a Xcode project treats this guidance as a review gate. It checks whether the current implementation satisfies ****SwiftUI previews are a live compile, not a screenshot.** A type error in the previewed view is a real error in that view.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for xcode-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
