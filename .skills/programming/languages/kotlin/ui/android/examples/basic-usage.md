# Android: Basic Usage

Android application development with Kotlin — Gradle/version catalogs, module structure, lifecycle, Hilt DI, Room, WorkManager, permissions, edge-to-edge, and release hardening.

## Scenario

Use this example as a starting point when applying **android-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Gradle & Build Logic** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```toml
[versions]
agp = "8.13.0"
kotlin = "2.2.20"
ksp = "2.2.20-2.0.4"

[libraries]
androidx-core-ktx = { module = "androidx.core:core-ktx", version = "1.17.0" }
androidx-lifecycle-runtime-compose = { module = "androidx.lifecycle:lifecycle-runtime-compose", version = "2.9.4" }
room-runtime = { module = "androidx.room:room-runtime", version = "2.7.2" }
hilt-android = { module = "com.google.dagger:hilt-android", version = "2.57" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt" }
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
