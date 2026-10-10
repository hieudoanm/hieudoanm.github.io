# Overview

Focused reference for **android-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Android Studio

Android Studio is the IntelliJ-based IDE for Android: it owns the Gradle sync, the Layout Editor and Compose tooling, the emulator, and the profilers. Its defining trait is that **it is a front end over a build system you must also be able to run from a terminal** — a project that only builds in the IDE is a project that will not build in CI. Practical Android Studio work is about **keeping the IDE in sync with a build you can reproduce on the command line, using the profilers rather than guessing, and matching the AGP/Studio/SDK versions deliberately**. App-level patterns live in android.md and kotlin.md.

_Verified against Android Studio Quail 4 (`2026.1.4`, September 2026), AGP 9.x, API 37, on the stable channel. Quail supports AGP 7.1–9.4; the 2026.2 Canary is Rabbit._

---

## 1. Channels & Version Compatibility

- **Four channels: stable, beta, canary, and (since Narwhal) RC.** Stable is what you ship. Canaries are for testing a new SDK; do not release from one.
- **Install a preview alongside stable, not over it.** They are separate bundles with separate settings, and switching means re-running a full Gradle sync.
- **AGP and Studio are versioned independently, and Studio is the constraint.** Quail 4 requires AGP in the 7.1–9.4 range; a project on AGP 9.4 cannot be opened by an older Studio without downgrading.
- **Compatibility is now time-based, not version-based.** Each Studio supports AGP versions released within the previous ~3 years, and AGP older than that is rejected. This replaced the old per-version table.
- **`compileSdk`/`targetSdk` set a floor on Studio and AGP.** Targeting API 37 needs Panda 3 or newer and AGP 9.1.1+. Check the table before choosing an SDK level, not after.
- **Cloud services (Gemini, Crashlytics) need a recent Studio.** Only the latest stable and versions from the last ~10 months have them; an older Studio silently loses the integrations.
- **Record the Studio version in your build docs.** It is a real input to the build, and "it worked on my machine" is often literally true.

```bash
# What the build actually uses, regardless of IDE
./gradlew --version          # Gradle, JVM, and which Android SDK
./gradlew :app:dependencies  # the resolved AGP/Kotlin graph
```

---

## 2. JDK, Gradle & Sync

- **JDK 17+ is required; JDK 21 is the practical target** for current AGP. A mismatched JDK is the most common cause of a project that will not open on a new machine.
- **Set the Gradle JDK in `gradle.properties` or the wrapper properties**, not only in Studio's settings — otherwise a terminal build silently uses a different JVM.
- **The Gradle wrapper is the source of truth for Gradle version.** Never a locally installed Gradle; commit `gradle/wrapper/gradle-wrapper.properties`.
- **Pin the Android Gradle Plugin and Kotlin plugin via a version catalog** (`gradle/libs.versions.toml`). This is the modern single source of truth and is what makes version bumps reviewable.
- **Use a version catalog over `ext` properties or buildscript blocks.** It gives type-safe accessors, and the IDE resolves them without a hack.
- **Configure `gradle.properties` deliberately** — `org.gradle.jvmargs`, `org.gradle.parallel`, `org.gradle.caching`, `android.useAndroidX`. These are read by CLI builds too, so a tuning win applies everywhere.

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

- **A failed sync is usually the Gradle version, the JDK, or a missing SDK platform** — read the first error, not the last one, because Gradle cascades.
- **Configure an offline or local repository if CI is air-gapped** and a sync will otherwise fail on dependency resolution rather than on your code.
