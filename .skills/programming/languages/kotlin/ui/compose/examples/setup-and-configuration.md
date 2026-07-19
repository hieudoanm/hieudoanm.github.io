# Compose Multiplatform Best Practices: 1. Core Stack & Gradle Setup

## Source guidance

This example applies the **1. Core Stack & Gradle Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Always apply `kotlin("plugin.compose")`** — since Kotlin 2.0 the Compose compiler ships as a Kotlin plugin, and the old `composeOptions { kotlinCompilerExtensionVersion }` is gone.
- **`google()` is required.** Compose pulls `androidx.lifecycle` and `androidx.savedstate`; resolution fails without it even for a pure-desktop target.
- **Reference Compose accessors inline in `dependencies {}`.** `val deps = listOf(compose.desktop.currentOs)` fails with "unresolved reference: currentOs" — the accessor is a delegated property that only works in the DSL scope.

## Example

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    kotlin("plugin.compose") version "2.4.20"   // required: the Compose compiler plugin
    id("org.jetbrains.compose") version "1.12.1"
}

dependencies {
    // MUST be referenced inline. Collecting these into a listOf(...) breaks
    // resolution, because the accessors are resolved at configuration time.
    implementation(compose.desktop.currentOs)
    implementation(compose.material3)
    implementation(compose.foundation)
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for compose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
