---
name: android-studio-best-practices
description: Best practices for Android development in Android Studio — channels and AGP compatibility, JDK and Gradle setup, emulator and device workflows, profiling, and Studio vs CLI parity. Use when setting up or debugging an Android project in the IDE.
---

# Android Studio

Android Studio is the IntelliJ-based IDE for Android: it owns the Gradle sync, the Layout Editor and Compose tooling, the emulator, and the profilers. Its defining trait is that **it is a front end over a build system you must also be able to run from a terminal** — a project that only builds in the IDE is a project that will not build in CI. Practical Android Studio work is about **keeping the IDE in sync with a build you can reproduce on the command line, using the profilers rather than guessing, and matching the AGP/Studio/SDK versions deliberately**. App-level patterns live in [android.md](../ui/android.md) and [kotlin.md](../../kotlin.md).

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

---

## 3. Project & Module Structure

- **One `app` module, plus library modules only when the boundary earns it.** Every module costs build time, and Studio's indexer degrades as the module count grows.
- **Use `app/src/main`, `debug`, and `release` source sets deliberately.** `debug`-only manifest entries (cleartext traffic, the `applicationIdSuffix`) keep test config out of release.
- **Keep the `AndroidManifest.xml` minimal and let the manifest merger do its job.** Every module declaring `<application>` attributes is a merge-conflict source.
- **Namespace replaces the package attribute** on `application` (AGP 8+). Set it per module and do not also set `package` in the manifest — they must agree.
- **Prefer view binding or Compose over `findViewById`**, and generate it in the module it is used in. Data binding is legacy unless you need two-way binding with XML.
- **A version catalog and a convention plugin** are the two investments that make a multi-module project maintainable; do them early, not after the third copy-pasted `build.gradle.kts`.

---

## 4. Editor & Inspections

- **The Layout Editor is a genuine WYSIWYG editor**, but the XML is the source of truth — know how to fix a constraint by hand.
- **Compose previews are live and typed.** A preview that will not compile is a real error in that composable; `@Preview` bodies are compiled by default in debug builds.
- **Parameterised previews let you render the same composable across themes, font scales, and locales** — the fastest way to catch a layout that only works in English at default text size.
- **Use the Layout Inspector to see the live view hierarchy** and its bounds, rather than inferring depth from screenshots.
- **Enable `@Preview` and lint checks in the build, not just the IDE**, so they run in CI. Studio's inspections are a superset of what `lint` will catch.
- **The "Code Vision" inspections are opt-in per setting** and useful (`@Preview`, parameter names), but keep the important ones as lint/compiler checks so they cannot be turned off by one developer.
- **Turn on "Apply code changes without restart"** (Apply Changes) for the Compose/Hot Reload loop; it is materially faster than a full rebuild and is Studio's best iteration feature.

---

## 5. Emulator & Devices

- **Use a physical device for anything performance-related.** The emulator runs on your host CPU and its timing, thermal behaviour, and graphics driver are not representative.
- **Create AVDs per API level you support and keep a hardware profile per form factor** (phone, foldable, tablet). One "Pixel 8" AVD does not cover a foldable's posture changes.
- **Test edge-to-edge and insets on a device with a cutout**, not a rectangular emulator image.
- **`adb` is the real interface** — `adb install -r`, `adb logcat`, `adb shell am start`, `adb devices`. Learn it; the IDE buttons are conveniences over it.
- **`adb logcat` with a package filter beats the IDE Logcat pane** for anything you intend to read closely or grep.
- **Cold boot vs quick boot, and snapshots, change first-launch behaviour** — a test that only passes after a snapshot restore is a test you do not trust.
- **For CI, use a managed device or a cloud device farm** rather than trying to keep an emulator alive in a container.

```bash
adb devices -l
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb logcat --pid=$(adb shell pidof com.example.app)
adb shell am start -n com.example.app/.MainActivity
```

---

## 6. Profiling & Debugging

- **The Profiler (now System Trace plus Memory) is the tool for startup, CPU, and memory.** Start with a recorded trace, not with intuition about which method is slow.
- **Measure startup explicitly** — `adb shell am start -W` gives cold-start timings, and Macrobenchmark reports them in a form you can gate in CI. This is the only way to prove a startup fix worked.
- **Memory Profiler for allocations and leaks; the Leak Canary dependency for a repeatable heap check.** A leak found by the IDE profiler is a leak you already spent an afternoon on.
- **Network Inspector shows what actually went over the wire**, including a third-party SDK quietly making calls you did not write.
- **Debug, Release, and Profile build types have different timings.** Profile is the one to profile in; Debug adds overhead that makes a CPU profile meaningless and disables some optimisations.
- **Attach the debugger for a bug you cannot reproduce, not a bug you just caused.** Attaching tells you the real state; restarting tells you the state you expect.
- **Breakpoints on lifecycle methods and coroutine dispatchers** catch the class of bug that logs do not — especially "why did this run twice".

---

## 7. Build Variants

- **Build variants are a cross-product of build type and product flavor**, and they multiply. Naming is a design decision: `freeDebug`, `paidRelease` is a convention that pays off.
- **`debug` and `release` are not just optimisation flags** — release enables R8 shrinking and resource shrinking, which is where missing-keep-rule and missing-reflection bugs appear. Test the release build.
- **Use `buildConfigField` and `resValue` to inject environment config per variant**, and a single `Config` object to read it, rather than scattering `BuildConfig.DEBUG` checks.
- **`applicationIdSuffix` in the debug build type** lets a debug and a release-signed app coexist on one device — invaluable when reproducing a Play-distributed bug.
- **`isMinifyEnabled` on release means the release build is a different artifact.** Any reflection, `enum.valueOf`, or Gson-style serialisation needs a keep rule; catch that in the release build, not in production.

```kotlin
// src/debug/kotlin/…/Config.kt
object Config {
    const val API_BASE: String = "https://staging.example.com"
    const val USE_STRICT_MODE: Boolean = true
}
```

---

## 8. Studio vs Command Line

- **The Gradle CLI is the build; Studio is a client of it.** If `./gradlew assembleDebug` fails, do not debug in the IDE — the IDE cannot see anything the CLI did not run.
- **Every IDE-only step is a CI gap.** Lint, tests, and the build belong in `./gradlew` tasks that CI runs; the Studio Run button is not a build you can reproduce.
- **Use `./gradlew` (the wrapper), never a system Gradle.** A machine-local Gradle version is the most common cause of "fails on the build server".
- **Run lint in CI as a gate**: `./gradlew lint` produces a report you can archive, and the `lintOptions`/`lint {}` config in the module owns the rules.
- **Use `./gradlew :app:dependencies` when a dependency resolves differently** than you expect — Studio's version of this is less honest about what is actually resolved.
- **The Gradle build cache and configuration cache are the real speed levers**, not Studio's own warm-up. Enable both in `gradle.properties`.

```bash
./gradlew :app:assembleDebug          # what the IDE's Run button does
./gradlew :app:testDebugUnitTest      # unit tests, no device
./gradlew :app:connectedDebugAndroidTest  # instrumented, needs a device
./gradlew lint                        # static analysis, CI gate
```

---

## 9. Source Control & Collaboration

- **The IDE's VCS integration is a convenience over `git`.** Merge conflicts, partial staging, and rebases are easier and safer from a real Git client, and your team will hit this.
- **Never commit `local.properties`** — it has a machine-specific SDK path. `local.properties` in `.gitignore` is not optional.
- **Commit `*.iml` files? No, and not `.idea/` either** in most cases. The project files that matter are `gradle/libs.versions.toml`, the wrapper, and the build scripts.
- **Use the IDE merge tool for `.kt` and `.xml` when both sides changed** — it understands Kotlin structure and beats a text diff — but resolve it deliberately; it is still a code review decision.
- **Format and lint on commit via a Gradle task, not an IDE autosave**, so the rules are the same locally and in CI.

---

## 10. Common Pitfalls

- **Building only in Studio**, with a sync setting or plugin version that no CI job has.
- **A local `gradle`/`sdk` version outside the wrapper**, so the build server fails.
- **Committing `local.properties`**, which hard-codes one machine's SDK path.
- **Profiling the Debug build**, where overhead makes CPU numbers meaningless — use `profile`.
- **Only ever testing on an emulator** and shipping a startup or graphics regression.
- **Testing release without R8 shrinking enabled**, then discovering a `ClassNotFoundException` or stripped reflection in production.
- **Forgetting `applicationIdSuffix` on debug**, so a locally signed build cannot coexist with the Play-installed one.
- **One AVD used to represent every form factor**, missing cutouts, foldables, and tablets.
- **Relying on `@Preview` alone**, where Compose renders but lint in CI does not run.
- **Flipping Studio channels in place** and losing the stable installation's settings.
- **Trusting the Layout Editor's drag result** without checking the constraints, which produces deeply nested `LinearLayout`s.
- **Reading the last error of a cascading Gradle failure** instead of the first.

---

## General Rules of Thumb

- `./gradlew` in CI, Studio for the inner loop; the CLI is the source of truth.
- JDK 21, wrapper-pinned Gradle, and a version catalog for AGP and Kotlin.
- `gradle.properties` for JVM args, parallelism, and the caches — read by every build.
- One `app` module plus libraries that earn the boundary; namespace per module, no `package` in the manifest.
- Compose previews plus `@Preview` parameterisation, backed by lint in CI.
- Profile the `profile` build type on a device; gate startup with Macrobenchmark.
- Test the release build — shrinking changes behaviour.
- `local.properties`, `.idea/`, and `build/` never committed; features that enforce rules belong in Gradle, not in IDE settings.

---

## Quick-Start Checklist

- [ ] JDK 21 selected for Gradle, set in project config rather than only in Studio
- [ ] `gradle/wrapper/gradle-wrapper.properties` committed; no system Gradle used
- [ ] `gradle/libs.versions.toml` pins AGP, Kotlin, and dependencies
- [ ] AGP version inside the range the team's Studio supports, verified against `compileSdk`
- [ ] `namespace` set per module and no `package` attribute in any manifest
- [ ] `local.properties`, `.idea/`, and `**/build/` in `.gitignore`
- [ ] One AVD per API level and form factor; a physical device available for perf work
- [ ] `./gradlew :app:assembleDebug` and `./gradlew lint` reproduce what the IDE does
- [ ] `applicationIdSuffix` set on the debug build type
- [ ] Release build exercised with R8 enabled; reflection and serialisation keep rules in place
- [ ] Profiling done on the `profile` build type against a device
- [ ] Startup measured with `am start -W` or Macrobenchmark rather than assumed
- [ ] Studio channel and version recorded in the project docs
