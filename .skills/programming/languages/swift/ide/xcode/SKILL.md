---
name: "xcode-best-practices"
description: "Best practices for building Apple apps in Xcode — projects vs workspaces, xcconfig, schemes, signing, DerivedData hygiene, LLDB debugging, SwiftUI previews, and xcodebuild parity with CI. Use when setting up or debugging an Xcode project."
tags:
  - "programming"
  - "language"
  - "swift"
  - "ide"
  - "xcode"
when_to_use: "Use when setting up or debugging an Xcode project."
prerequisites:
  - "Basic familiarity with Swift and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../ui/swiftui/SKILL.md"
  - "../../ui/ios/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Xcode

Xcode is the compiler driver, build system, simulator, debugger, and profiler for every Apple platform — and it is also a large amount of IDE state that does not belong in version control. Practical Xcode work is mostly about **knowing which files are generated and must be ignored, keeping build configuration out of the IDE, and making sure CI compiles what you compiled locally**. App-level patterns live in swift.md and the platform playbooks alongside it.

_Verified against Xcode 26.6 (17F113, June 2026) with Swift 6.2, on macOS Tahoe 26.x. Xcode 27 is in beta with the iOS 27 SDK._

## When to use

Use when setting up or debugging an Xcode project.

## Prerequisites

- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Opening the .xcodeproj instead of the .xcworkspace**, making packages and pods appear missing
- **Committing xcuserdata**, which produces per-user diff noise on every machine
- **Configuration set in the IDE instead of an .xcconfig**, invisible to review and lost in merge conflicts
- **Forgetting $(inherited)** in a target-level override, silently dropping inherited flags
- **Sharing the wrong scheme**, or not sharing it at all, so a build variant only exists on one machine
- **An unshared scheme with a stale launch argument** making a staging build look broken
- **Hard-coded DEVELOPMENT_TEAM per developer** instead of in the xcconfig
- **Building a release with Debug settings**, or shipping with -Onone and full debug symbols

## Focus areas

- 1. Versions & Compatibility
- 2. Projects & Workspaces
- 3. Build Configuration
- 4. Schemes
- 5. Signing
- 6. DerivedData
- 7. Debugging
- 8. Previews & Refactoring
- 9. Command Line & CI
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
