---
name: "android-studio-best-practices"
description: "Best practices for Android development in Android Studio — channels and AGP compatibility, JDK and Gradle setup, emulator and device workflows, profiling, and Studio vs CLI parity. Use when setting up or debugging an Android project in the IDE."
tags:
  - "programming"
  - "language"
  - "kotlin"
  - "ide"
  - "android"
  - "studio"
when_to_use: "Use when setting up or debugging an Android project in the IDE."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../cli/mordant/SKILL.md"
  - "../../cli/clikt/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Android Studio

Android Studio is the IntelliJ-based IDE for Android: it owns the Gradle sync, the Layout Editor and Compose tooling, the emulator, and the profilers. Its defining trait is that **it is a front end over a build system you must also be able to run from a terminal** — a project that only builds in the IDE is a project that will not build in CI. Practical Android Studio work is about **keeping the IDE in sync with a build you can reproduce on the command line, using the profilers rather than guessing, and matching the AGP/Studio/SDK versions deliberately**. App-level patterns live in...

## When to use

Use when setting up or debugging an Android project in the IDE.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Building only in Studio**, with a sync setting or plugin version that no CI job has
- **A local gradle/sdk version outside the wrapper**, so the build server fails
- **Committing local.properties**, which hard-codes one machine's SDK path
- **Profiling the Debug build**, where overhead makes CPU numbers meaningless — use profile
- **Only ever testing on an emulator** and shipping a startup or graphics regression
- **Testing release without R8 shrinking enabled**, then discovering a ClassNotFoundException or stripped reflection in production
- **Forgetting applicationIdSuffix on debug**, so a locally signed build cannot coexist with the Play-installed one
- **One AVD used to represent every form factor**, missing cutouts, foldables, and tablets

## Focus areas

- 1. Channels & Version Compatibility
- 2. JDK, Gradle & Sync
- 3. Project & Module Structure
- 4. Editor & Inspections
- 5. Emulator & Devices
- 6. Profiling & Debugging
- 7. Build Variants
- 8. Studio vs Command Line
- 9. Source Control & Collaboration
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
