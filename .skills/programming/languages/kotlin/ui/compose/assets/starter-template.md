# Compose Multiplatform Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Gradle Setup** section of [Compose Multiplatform Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```kotlin
// settings.gradle.kts — google() is mandatory, not optional
pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositories { google(); mavenCentral() }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
