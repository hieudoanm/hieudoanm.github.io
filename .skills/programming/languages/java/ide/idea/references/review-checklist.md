# Review checklist

Focused reference for **intellij-idea-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
