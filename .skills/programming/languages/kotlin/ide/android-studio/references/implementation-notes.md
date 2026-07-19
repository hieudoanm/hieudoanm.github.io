# Implementation notes

Focused reference for **android-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
