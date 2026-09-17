# Mordant Best Practices: 1. Core Stack & Gradle Setup

## Source guidance

This example applies the **1. Core Stack & Gradle Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

`com.github.ajalt.mordant:mordant` is the umbrella coordinate and pulls two layers:
The three backends are not a mistake and not something you configure; they are alternative native bindings for terminal size and raw mode, and all of them end up on the runtime classpath. On a JVM without FFI support the size query degrades instead of throwing, but **do not assume `terminal.size` is correct in a container or over a plain pipe** — always keep a sane fallback width.

## Example

This excerpt is from the cited **1. Core Stack & Gradle Setup** section.

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.mordant:mordant:3.1.0")
    testImplementation(kotlin("test"))
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mordant-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
