# Clikt Best Practices: 1. Core Stack & Gradle Setup

## Source guidance

This example applies the **1. Core Stack & Gradle Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Clikt 5 is split into artifacts, and the split is not cosmetic. Add the **umbrella** coordinate unless you have a reason not to:
**Verified:** `test()` and `prompt()` live in the full `clikt-jvm` artifact, _not_ in `clikt-core-jvm`. Depending on `clikt-core` alone compiles your production code and then fails the moment you add a test.
Clikt's help formatter is Mordant-powered, so Clikt drags Mordant in transitively. It requests **Mordant 3.0.2**, which loses conflict resolution against any Mordant version you declare yourself. If the app also uses Mordant directly, pin it explicitly so the graph has exactly one Mordant version:

## Example

```kotlin
dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    implementation("com.github.ajalt.mordant:mordant:3.1.0") // wins over Clikt's transitive 3.0.2
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for clikt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
