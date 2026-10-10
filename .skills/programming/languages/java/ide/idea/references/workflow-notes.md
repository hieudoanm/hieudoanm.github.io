# Workflow notes

Focused reference for **intellij-idea-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
