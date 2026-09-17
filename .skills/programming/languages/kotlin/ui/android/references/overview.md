# Overview

Focused reference for **android-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Android

Android is Google's mobile platform, built on the Linux kernel with a managed app lifecycle, a permission model, and a component system (Activity, Service, BroadcastReceiver, ContentProvider). Modern Android apps are Kotlin-first, XML-optional, and use Jetpack libraries for nearly every platform concern. This skill covers the _platform_ layer — language details live in kotlin.md, UI in compose.md, and visual design in material-design-m3.md.

## 1. Core Stack & Module Structure

- **Kotlin + K2 compiler**: standard since Kotlin 2.0; the compiler ships with the Kotlin plugin, so no separate Compose compiler version.
- **Jetpack Compose** for UI, **AndroidX** for platform glue, **KSP** for annotation processing.
- **Layers**: `ui` (Compose + ViewModel), `domain` (pure Kotlin, no Android deps), `data` (Room, Retrofit, DataStore). The `domain` module must stay Android-free so it is testable on the JVM.
- **Prefer a single `:app` module** until build times or team ownership actually force a split. Premature multi-module is a common source of accidental public API and slow builds.

```text
:app            AndroidManifest, Application, navigation host, DI wiring
:core:ui         Compose theme, design-system components, previews
:core:data       Room, Retrofit, DataStore, repositories
:core:domain     Models, use cases — pure Kotlin, zero Android imports
```

- **Modules export narrow APIs**: put implementation in `internal` and expose one facade per module. Avoid `api(...)` for everything; it leaks transitive dependencies across the whole graph.

## 2. Gradle & Build Logic

- **Kotlin DSL only** — never Groovy (`build.gradle` over `build.gradle.kts`).
- **Version catalogs** (`gradle/libs.versions.toml`) are the single source of truth for versions. Never inline a version string in a module.
- **`build-logic` included build** for convention plugins, **not `buildSrc`**: `buildSrc` recompiles on every change and invalidates configuration cache.
- **KSP, not kapt**: kapt is in maintenance mode; Room, Hilt, and kotlinx-serialization all support KSP.

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

- **Type-safe accessors** (`libs.androidx.core.ktx`) work automatically; a missing accessor means the catalog alias has a typo, not that you need a fallback. Keep the catalog alphabetic so version bumps produce small diffs.
