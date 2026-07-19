# Overview

Focused reference for **intellij-idea-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# IntelliJ IDEA

IntelliJ IDEA is JetBrains' flagship JVM IDE: the most complete refactoring and code-insight implementation available for Java and Kotlin, with framework support for Spring, Jakarta EE, and Quarkus. As of **2025.3 there is one IntelliJ IDEA**, replacing the separate Community and Ultimate editions — the free tier is limited by a non-commercial-use condition rather than by features. Practical IDEA work is about **letting Gradle own the build so the IDE never diverges from CI, and committing the project configuration that the team shares**. Language rules live in java.md; Kotlin rules live in kotlin.md.

_Verified against IntelliJ IDEA 2026.2.3 (September 2026) with Java 25 and Kotlin 2.x. The unified edition shipped 2025-12-08 with the 2025.3 release._

---

## 1. Editions & the Unified Release

- **One IntelliJ IDEA, two tiers.** The free tier requires a non-commercial licence; the paid tier is for commercial use. Feature gating between tiers is narrower than the old Community/Ultimate split.
- **Check the licence state before relying on a feature.** A free-tier IDE running in a commercial context is a licensing problem, not a configuration problem.
- **The IDE version is not the JDK version.** IDEA can debug and run against several JDKs; the project selects one via Gradle/Maven and `Project SDK`.
- **Non-commercial licences are per user and require periodic verification.** A lapsed one reverts the IDE to the free tier, which can silently disable a framework plugin.

---

## 2. Gradle Project Model
