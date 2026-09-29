---
name: intellij-idea-best-practices
description: Best practices for IntelliJ IDEA — the unified free and paid tiers, Gradle as the project model, the Kotlin/Java tooling chain, AI Assistant and Junie, code cleanup, and JetBrains shared conventions. Use when setting up, debugging, or refactoring a JVM project in IntelliJ IDEA.
---

# IntelliJ IDEA

IntelliJ IDEA is JetBrains' flagship JVM IDE: the most complete refactoring and code-insight implementation available for Java and Kotlin, with framework support for Spring, Jakarta EE, and Quarkus. As of **2025.3 there is one IntelliJ IDEA**, replacing the separate Community and Ultimate editions — the free tier is limited by a non-commercial-use condition rather than by features. Practical IDEA work is about **letting Gradle own the build so the IDE never diverges from CI, and committing the project configuration that the team shares**. Language rules live in [java.md](../java.md); Kotlin rules live in [kotlin.md](../../kotlin/kotlin.md).

_Verified against IntelliJ IDEA 2026.2.3 (September 2026) with Java 25 and Kotlin 2.x. The unified edition shipped 2025-12-08 with the 2025.3 release._

---

## 1. Editions & the Unified Release

- **One IntelliJ IDEA, two tiers.** The free tier requires a non-commercial licence; the paid tier is for commercial use. Feature gating between tiers is narrower than the old Community/Ultimate split.
- **Check the licence state before relying on a feature.** A free-tier IDE running in a commercial context is a licensing problem, not a configuration problem.
- **The IDE version is not the JDK version.** IDEA can debug and run against several JDKs; the project selects one via Gradle/Maven and `Project SDK`.
- **Non-commercial licences are per user and require periodic verification.** A lapsed one reverts the IDE to the free tier, which can silently disable a framework plugin.

---

## 2. Gradle Project Model

- **The IDE must delegate the build to Gradle** (Settings → Build Tools → Gradle → Build and run using: Gradle). Delegating to IntelliJ's own builder is the most common cause of "works in IDEA, fails in CI".
- **Never commit `.idea/` wholesale.** Commit `codeStyles/`, `inspectionProfiles/`, and `.run/`; ignore the rest. The gitignore must re-include those paths explicitly, because git will not descend into an ignored directory.
- **Use `gradle/libs.versions.toml` (version catalog) for dependencies** and commit it. It is the one place to change a version, and it is what CI reads.
- **Prefer the Gradle wrapper and always run `./gradlew`** — a system Gradle is a different version and produces different behaviour.
- **If the IDE and CLI disagree on dependencies,** run with `--refresh-dependencies` before assuming a build-script bug.
- **Annotation processors must be declared in the build script** (`annotationProcessor` / `kapt` / `ksp`), not configured as a plugin toggle. The IDE can generate a `kapt` configuration for you, but it must be committed.

```kotlin
// gradle/libs.versions.toml
[versions]
kotlin = "2.2"
springBoot = "3.5"
[libraries]
spring-web = { module = "org.springframework:spring-web", version.ref = "springBoot" }
kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib", version.ref = "kotlin" }
```

- **Multi-module Gradle means the IDE mirrors the module graph**; keep the Gradle structure honest rather than adding IDEA-specific module wrappers, which nobody else can open.
- **A project that does not open cleanly for a new contributor is a build problem.** The measure of a working setup is a fresh clone opening with no manual steps.

---

## 3. Refactoring & Inspections

- **IDEA's refactorings are the reference implementation for Java and Kotlin** — extract, inline, introduce parameter, change signature, and the Kotlin-specific idioms. Use them; they are backed by the same index as inspection.
- **Refactor before you review.** Rename, extract, and move are safer at the IDE's confidence level than by hand, because the index knows every reference including generated and reflection-assisted ones.
- **Set the inspection profile to Project and commit it.** Severity in a personal profile is invisible to the team; a convention nobody sees is not a convention.
- **Use `.editorconfig` for formatting** and the inspection profile for analysis severity. The built-in formatter can be set to the same IntelliJ formatter, but do not let it reformat differently from `spotless`/`ktlint` — that is how you get a reformat-only commit.
- **Connect the inspection profile to the build** (the Inspect Code → "Run inspection" integration) if the team wants the IDE findings to be part of CI; otherwise a warning in the IDE stays advisory.
- **The Kotlin K2 compiler is the default in current versions** and is the reason indexing is faster; do not disable it for compatibility with an old plugin.

---

## 4. Debugging

- **Use the debugger's "Evaluate Expression" in the frame where the value is still meaningful,** not where the crash surfaced.
- **Set an exception breakpoint on throw** to find the origin, and use "Any exception" sparingly — it fires on caught exceptions too and floods the session.
- **Attach to a running JVM** (Run → Attach to Process, or the `jcmd`-based helper) for anything with a scheduler or a hot-reload loop. A debugger-launched process is not the same as the one under load.
- **Enable "Reload changed classes" (HotSwap) for a fast edit loop,** and be aware it does not support structural changes — a method body yes, a new field no.
- **For Kotlin coroutines, suspend points are transparent to the debugger**; stepping through a coroutine builder shows resumption points, which is why a stack that looks incomplete is normal.
- **Turn on "Async stack traces"** (`-XX:+DebugAsyncSafePoints` in older JDKs, on by default in modern ones) or deep JVM stacks will be unfollowable.

---

## 5. Spring, Jakarta, and Frameworks

- **The Spring plugin is the reason Ultimate-tier features are worth it,** and it is now bundled in the unified IDE. It resolves beans, understands DI, and offers a visual navigation that is faster than grep for a large graph.
- **The plugin reads the actual application context**, so a missing bean is a real error at startup — run the context, do not guess.
- **Quarkus, Micronaut, and Spring Boot have dedicated plugins** with dev-mode integration (live reload on bean change). Use the dev-mode run configuration rather than a plain JVM run.
- **A build-tool-run config (Gradle/Maven) is the correct default** for framework apps, because it supplies the classpath the dev-mode tools expect.
- **Careful with Lombok or Kotlin kapt:** the IDE must run the annotation processor via the build, or generated code is invisible and every refactor is unsafe.

---

## 6. JetBrains Shared Conventions

These apply across the JetBrains family (Rider, CLion, WebStorm, PyCharm, and the rest):

- **`.idea/` is per-user state and is ignored except `codeStyles/`, `inspectionProfiles/`, and `.run/`.** The re-include lines are required in `.gitignore`.
- **A directory marked "Excluded" is invisible to inspections, refactoring, and search.** This is the first thing to check when the IDE "misses" a file.
- **Settings are scoped to `This computer` or the project.** Anything the team should share belongs to the project scope, or in a committed config file.
- **The Toolbox App manages installs and plugin engines**; a plugin's bundled engine may differ from the IDE's, which explains occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- Delegate the build to Gradle/Maven; a hand-configured IDE build is the root cause of "works on my machine".
- Commit `codeStyles/`, `inspectionProfiles/`, `.run/`, and `libs.versions.toml`; ignore the rest of `.idea/`.
- Use `./gradlew`, not a system Gradle.
- Refactor with the IDE's refactorings; rename and extract are safer than by hand.
- Exception breakpoints on throw; attach to a running process for anything scheduled.
- Use the project's framework dev-mode run configuration, not a plain JVM run.
- Check licence tier before relying on a plugin; the free tier is non-commercial only.

---

## Quick-Start Checklist

- [ ] Build delegated to Gradle or Maven in Settings
- [ ] `gradle/libs.versions.toml` (or equivalent) committed as the single source of dependency versions
- [ ] `.idea/` ignored with `run/`, `codeStyles/`, `inspectionProfiles/` re-included
- [ ] Wrapper used for every build (`./gradlew`)
- [ ] Inspection profile set to Project and committed
- [ ] Formatter matched to the repo's `spotless`/`ktlint` config
- [ ] Annotation processors declared in the build script, not only in the IDE
- [ ] Project SDK matches `toolchain` in the build file
- [ ] HotSwap verified for the edit loop; async stack traces enabled
- [ ] Framework run configuration uses the dev-mode target
- [ ] Fresh clone opens with no manual configuration
- [ ] AI Assistant or Copilot enabled — not both
