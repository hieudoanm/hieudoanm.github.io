# Android Studio: Starter Template

A reusable starting point derived from the **2. JDK, Gradle & Sync** section of [Android Studio](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```toml
# gradle/libs.versions.toml
[versions]
agp = "9.4.0"
kotlin = "2.2.0"
[libraries]
androidx-core-ktx = { module = "androidx.core:core-ktx", version = "1.17.0" }
[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
