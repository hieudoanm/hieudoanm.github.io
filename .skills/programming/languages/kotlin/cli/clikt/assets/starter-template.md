# Clikt Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Gradle Setup** section of [Clikt Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    testImplementation(kotlin("test"))
}

application { mainClass.set("io.example.cli.MainKt") }
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
