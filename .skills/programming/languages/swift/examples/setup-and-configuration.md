# Swift Best Practices: 1. Project Structure

## Source guidance

This example applies the **1. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Swift Package Manager is the default for libraries and CLI tools; Xcode projects for app targets:
- **SwiftPM for anything reusable** — one `Package.swift` per module layout; keep a binary/library split (`Sources/MyLibrary` + a thin `Sources/mycli/main.swift`) so logic is testable.
- One top-level type per file, named after the file — a file is a unit of discoverability, not just of code.
- Use subdirectories inside `Sources/<Target>/` for large tops (Models, Services, Views), matching module boundaries.
- Keep **extensions in dedicated files** (`String+Validation.swift`) or co-located with the type they extend — never scatter them randomly.

## Example

A team applying **1. Project Structure** to a Swift Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****SwiftPM for anything reusable** — one `Package.swift` per module layout; keep a binary/library split (`Sources/MyLibrary` + a thin `Sources/mycli/main.swift`) so logic is testable.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for swift-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
