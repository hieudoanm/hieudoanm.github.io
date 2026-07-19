# macOS Development: Decision Record

Use this record when applying [macOS Development](../SKILL.md) to a concrete project decision.

## Context

Best practices for building native macOS apps in Swift — windows and scenes, menus and commands, settings, sandboxing, Keychain, and AppKit interop. Use when creating, structuring, or reviewing a Mac app.

macOS is a **window-and-menu operating system**. There is no single screen, no app-level navigation stack, and no one app switcher entry — the user is always operating on documents and windows with a keyboard in hand. Practical Mac work leans on **scenes with stable window identities, a real menu bar with validated commands, the App Sandbox, and a keychain for secrets** — while SwiftUI conventions live in swiftui.md, language rules in swift.md, and touch platforms in ios.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Swift and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Target, Sandbox & Distribution
- [ ] 2. App Structure & Scenes
- [ ] 3. Windows
- [ ] 4. Navigation & Data Presentation
- [ ] 5. Menus & Commands
- [ ] 6. Settings
- [ ] 7. Security, Secrets & Privacy
- [ ] 8. AppKit Interop

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
