---
name: "android-best-practices"
description: "Android application development with Kotlin — Gradle/version catalogs, module structure, lifecycle, Hilt DI, Room, WorkManager, permissions, edge-to-edge, and release hardening."
tags:
  - "programming"
  - "language"
  - "kotlin"
  - "ui"
  - "android"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Android in a project."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../compose/SKILL.md"
  - "../material-design-m3/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Android

Android is Google's mobile platform, built on the Linux kernel with a managed app lifecycle, a permission model, and a component system (Activity, Service, BroadcastReceiver, ContentProvider). Modern Android apps are Kotlin-first, XML-optional, and use Jetpack libraries for nearly every platform concern. This skill covers the _platform_ layer — language details live in kotlin.md, UI in compose.md, and visual design in material-design-m3.md.

## When to use

Use when implementing, configuring, evaluating, or troubleshooting Android in a project.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Collecting flows in onCreate without repeatOnLifecycle** — work continues in the background and UI shows stale state
- **fallbackToDestructiveMigration() shipping to production** — a schema change deletes every user's local data
- **Versions hardcoded in module Gradle files** — upgrades drift and reviews become unreadable
- **Requesting permissions at launch** — a cold permission dialog on first open is the fastest path to denial and to a one-star review
- **Ignoring edge-to-edge** — content renders under the status bar or notch on Android 15+
- **kapt for new code** — slower than KSP and no longer receiving improvements
- **Blocking the main thread in onCreate/onResume** — dropped frames and ANRs
- **Debug-only verification** — never ship a build you have not run minified and on a real device

## Focus areas

- 1. Core Stack & Module Structure
- 2. Gradle & Build Logic
- 3. Manifest, Permissions & Edge-to-Edge
- 4. Lifecycle & State Ownership
- 5. Dependency Injection with Hilt
- 6. Persistence: Room & DataStore
- 7. Background Work & Services
- 8. Networking & Serialization
- 9. Navigation
- 10. Performance & Startup
- 11. Testing
- 12. Release & Distribution
- Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
