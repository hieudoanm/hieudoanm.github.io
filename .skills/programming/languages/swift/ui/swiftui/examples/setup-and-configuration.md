# SwiftUI Best Practices: 10. Performance & App Structure

## Source guidance

This example applies the **10. Performance & App Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Profile with Instruments before optimizing** — the usual suspects: whole-subtree re-renders, image re-decoding, `ZStack` overdraw.
- **`Equatable` + stable identity reduce re-render churn; `@Bindable`/`@Observable` scoped reads limit invalidation.**
- **Images**: `AsyncImage`/`Kingfisher`-style caching with rendered-size decoding; never unbounded typed-image axis.
- **Keep the App/Scene shell thin** — wiring in `@main`, environment setup and launches in scene/App modifiers only.

## Example

A team applying **10. Performance & App Structure** to a SwiftUI Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Profile with Instruments before optimizing** — the usual suspects: whole-subtree re-renders, image re-decoding, `ZStack` overdraw.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for swiftui-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
