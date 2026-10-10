---
name: "ios-best-practices"
description: "Best practices for building iPhone apps in Swift — the platform layer of iOS. Use when creating, structuring, or reviewing an iOS app — covers scene lifecycle, adaptive layout, permissions, background execution, persistence, Liquid Glass, performance, and App Store distribution."
tags:
  - "programming"
  - "language"
  - "swift"
  - "ui"
  - "ios"
when_to_use: "Use when creating, structuring, or reviewing an iOS app."
prerequisites:
  - "Basic familiarity with Swift and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../swiftui/SKILL.md"
  - "../ipados/SKILL.md"
  - "../macos/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# iOS Development

iOS is Apple's handheld platform, and its defining constraint is that **the app does not own the screen**. The system owns the window, the safe area, the process lifecycle, and increasingly the ability to resize and relocate your scenes. Practical iOS work leans on **scene-based lifecycle, size classes instead of device checks, permission requests in context, and background work through BGTaskScheduler** — while SwiftUI conventions live in swiftui.md and language rules in swift.md.

## When to use

Use when creating, structuring, or reviewing an iOS app.

## Prerequisites

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Branching on userInterfaceIdiom or screen size** — use size classes and adaptive containers; idiom is no longer meaningful
- **Reading UIScreen.main** — wrong under iPhone Mirroring, iPad multitasking, and external displays
- **Requesting permissions at launch**, or without a denial path
- **A missing usage description key** — guaranteed crash on first use
- **Assuming a long-running background task will finish.** It will not
- **Glassifying every view**, or putting a solid background behind a glass surface
- **Full-resolution images in lists** — memory spikes and scroll drops
- **Shipping without a Privacy Manifest**, which is now an upload rejection

## Focus areas

- 1. Target Setup & Configuration
- 2. Scene Lifecycle
- 3. Adaptive Layout
- 4. Permissions & Privacy
- 5. Background Execution
- 6. Persistence & Secrets
- 7. Liquid Glass & Materials (iOS 26+)
- 8. Performance & Launch
- 9. Distribution
- Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
