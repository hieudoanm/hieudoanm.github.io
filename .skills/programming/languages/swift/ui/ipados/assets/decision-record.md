# iPadOS Development: Decision Record

Use this record when applying [iPadOS Development](../SKILL.md) to a concrete project decision.

## Context

Best practices for building iPad apps in Swift — adaptive multi-column layouts, resizable windows, multitasking, pointer and Pencil input, and scene restoration. Use when creating, structuring, or reviewing an iPad experience.

iPadOS is not an iPhone with a bigger screen — since iPadOS 26 it runs a **full desktop-style windowing system**: resizable windows, a menu bar, traffic-light controls, and free movement between displays. Practical iPad work leans on **NavigationSplitView doing the adapting for you, zero device or orientation checks, and layouts that stay sane down to 375pt wide** — while SwiftUI conventions live in swiftui.md, language rules in swift.md, and iPhone specifics in ios.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Target Setup
- [ ] 2. Windowing & Scenes
- [ ] 3. Adaptive Navigation
- [ ] 4. Adaptive Layout
- [ ] 5. Input & Interaction
- [ ] 6. Multitasking & External Displays
- [ ] 7. Performance Under Resizing
- [ ] 8. State Restoration

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
