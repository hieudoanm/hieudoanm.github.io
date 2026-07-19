# Compose Multiplatform Best Practices: Basic Usage

Best practices for building desktop UIs with Compose Multiplatform (Kotlin). Use when writing, structuring, styling, or reviewing a Compose app — covers Gradle setup, theming and design tokens, state and recomposition, side effects, lists and performance, desktop windows, accessibility, and testing, with suggested values.

## Scenario

Use this example as a starting point when applying **compose-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Gradle Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```kotlin
// settings.gradle.kts — google() is mandatory, not optional
pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositories { google(); mavenCentral() }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
