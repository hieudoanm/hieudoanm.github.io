# Overview

Focused reference for **compose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Compose Multiplatform Best Practices

Compose replaces the widget tree with a function tree: you describe what the UI should look like for the current state, and the runtime recomposes what changed. Best practice here is **state-first, token-driven, side-effect-free composition** — hoist state out of composables, consume design tokens instead of literal values, and keep the composable body a pure function of its parameters.

This document is written against **Kotlin 2.4+ / Compose 1.12+** and includes concrete values you can drop straight into code.

---

## 1. Core Stack & Gradle Setup

```kotlin
// settings.gradle.kts — google() is mandatory, not optional
pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositories { google(); mavenCentral() }
}
```

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

- **Always apply `kotlin("plugin.compose")`** — since Kotlin 2.0 the Compose compiler ships as a Kotlin plugin, and the old `composeOptions { kotlinCompilerExtensionVersion }` is gone.
- **`google()` is required.** Compose pulls `androidx.lifecycle` and `androidx.savedstate`; resolution fails without it even for a pure-desktop target.
- **Reference Compose accessors inline in `dependencies {}`.** `val deps = listOf(compose.desktop.currentOs)` fails with "unresolved reference: currentOs" — the accessor is a delegated property that only works in the DSL scope.
- **`installDist` can fail on a duplicate jar.** The Compose plugin and the `application` plugin both contribute the desktop runtime:

```kotlin
tasks.installDist {
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}
```

- **You do not need `compose.desktop { application { } }`.** That block exists to own `mainClass`. If your app already has its own entry point (a CLI framework, for instance), use Gradle's `application { mainClass }` and call `application { }` from your own `main`.
- **Let the accessors pick the library versions.** `compose.material3` under Compose Multiplatform `1.12.1` resolves to AndroidX Material3 `1.9.0`, not `1.12.1` — the versions are aligned per library, not shared. Pinning `androidx.compose.material3:material3:1.12.x` by hand will not resolve.

---

## 2. Theming: Define Tokens Once, Consume by Role

Never hardcode a color, size, or font. Define once at the root, consume via `MaterialTheme.*` everywhere else.

```kotlin
@Composable
fun App(content: @Composable () -> Unit) {
    val dark = isDesktopDarkTheme()
    MaterialTheme(
        colorScheme = if (dark) kevinDarkColorScheme() else kevinLightColorScheme(),
        typography = KevinTypography,
        shapes = KevinShapes,
        content = content,
    )
}
```

### Color

| Role                 | Light     | Dark      |
| -------------------- | --------- | --------- |
| `primary`            | `#3B7DD8` | `#7FB0FF` |
| `onPrimary`          | `#FFFFFF` | `#002F5F` |
| `surface`            | `#F7F7F9` | `#1A1A1E` |
| `onSurface`          | `#1A1A1E` | `#E8E8EC` |
| `surfaceVariant`     | `#E7E7EC` | `#2A2A30` |
| `onSurfaceVariant`   | `#6B6B75` | `#A8A8B3` |
| `outline`            | `#C4C4CC` | `#3E3E46` |
| `error`              | `#D64545` | `#FF6B6B` |
| `secondaryContainer` | `#DCE7FB` | `#1F3A5C` |

- **Pick one primary accent and use it sparingly** — primary actions, selection, focus. Not decoration.
- **Semantic roles over literal colors** — `MaterialTheme.colorScheme.error` survives a theme change; `Color.Red` does not.
- **`isSystemInDarkTheme()` does not exist on desktop.** It is Android-only and will not resolve. Detect the OS setting yourself (`UIManager`/AWT `Desktop` look-and-feel`, or `apple.awt.application.appearance`), and cache it — it is not a `State` and must not be re-read per frame.

### Typography

Use the M3 type ramp; do not invent sizes.

| Role          | Size / Weight | Use for                  |
| ------------- | ------------- | ------------------------ |
| `titleLarge`  | 22 / SemiBold | window/section titles    |
| `titleMedium` | 16 / SemiBold | counts, panel headers    |
| `bodyLarge`   | 16 / Regular  | primary content          |
| `bodyMedium`  | 14 / Regular  | table cells              |
| `labelLarge`  | 14 / Medium   | buttons                  |
| `labelSmall`  | 11 / Medium   | column headers, captions |

- **Line up hierarchy with the ramp, not with ad-hoc sizes.** If a value is not on the ramp, it is a design decision, not a style.
- **Give every `Text` an overflow policy** on a fixed-width layout: `maxLines` plus `overflow = TextOverflow.Ellipsis`. Unbounded text in a row is the single most common cause of a broken desktop layout.
