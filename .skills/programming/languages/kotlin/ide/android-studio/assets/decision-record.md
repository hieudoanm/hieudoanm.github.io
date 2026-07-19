# Android Studio: Decision Record

Use this record when applying [Android Studio](../SKILL.md) to a concrete project decision.

## Context

Best practices for Android development in Android Studio — channels and AGP compatibility, JDK and Gradle setup, emulator and device workflows, profiling, and Studio vs CLI parity. Use when setting up or debugging an Android project in the IDE.

Android Studio is the IntelliJ-based IDE for Android: it owns the Gradle sync, the Layout Editor and Compose tooling, the emulator, and the profilers. Its defining trait is that **it is a front end over a build system you must also be able to run from a terminal** — a project that only builds in the IDE is a project that will not build in CI. Practical Android Studio work is about **keeping the IDE in sync with a build you can reproduce on the command line, using the profilers rather than guessing, and matching the AGP/Studio/SDK versions deliberately**. App-level patterns live in android.md and kotlin.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Channels & Version Compatibility
- [ ] 2. JDK, Gradle & Sync
- [ ] 3. Project & Module Structure
- [ ] 4. Editor & Inspections
- [ ] 5. Emulator & Devices
- [ ] 6. Profiling & Debugging
- [ ] 7. Build Variants
- [ ] 8. Studio vs Command Line

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
