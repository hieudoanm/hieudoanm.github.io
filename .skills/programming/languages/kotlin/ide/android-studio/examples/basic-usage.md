# Android Studio: Basic Usage

Best practices for Android development in Android Studio — channels and AGP compatibility, JDK and Gradle setup, emulator and device workflows, profiling, and Studio vs CLI parity. Use when setting up or debugging an Android project in the IDE.

## Scenario

Use this example as a starting point when applying **android-studio-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Channels & Version Compatibility** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
# What the build actually uses, regardless of IDE
./gradlew --version          # Gradle, JVM, and which Android SDK
./gradlew :app:dependencies  # the resolved AGP/Kotlin graph
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
