# Xcode: Decision Record

Use this record when applying [Xcode](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Apple apps in Xcode — projects vs workspaces, xcconfig, schemes, signing, DerivedData hygiene, LLDB debugging, SwiftUI previews, and xcodebuild parity with CI. Use when setting up or debugging an Xcode project.

Xcode is the compiler driver, build system, simulator, debugger, and profiler for every Apple platform — and it is also a large amount of IDE state that does not belong in version control. Practical Xcode work is mostly about **knowing which files are generated and must be ignored, keeping build configuration out of the IDE, and making sure CI compiles what you compiled locally**. App-level patterns live in swift.md and the platform playbooks alongside it.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Versions & Compatibility
- [ ] 2. Projects & Workspaces
- [ ] 3. Build Configuration
- [ ] 4. Schemes
- [ ] 5. Signing
- [ ] 6. DerivedData
- [ ] 7. Debugging
- [ ] 8. Previews & Refactoring

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
