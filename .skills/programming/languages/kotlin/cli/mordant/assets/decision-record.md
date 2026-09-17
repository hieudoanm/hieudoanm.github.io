# Mordant Best Practices: Decision Record

Use this record when applying [Mordant Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building interactive terminal UIs in Kotlin with Mordant. Use when writing, structuring, or debugging a Mordant TUI — covers Gradle setup, terminal and ANSI capability detection, colors and styled output, widgets, raw mode and keyboard input, cursor and screen control, event loops, responsive layout, line endings, and testing with a terminal recorder, with suggested values.

Mordant is a terminal rendering and input library: it detects what the terminal can do, renders widgets to it, and — in raw mode — reads individual keypresses. Best practice here is **detect, degrade, and keep rendering pure** — probe the terminal once instead of guessing from environment variables, build frames as plain strings that are trivial to assert, and treat the terminal as a resource you must restore no matter how the program exits.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Gradle Setup
- [ ] 2. Terminal & Capability Detection
- [ ] 3. Colors & Styled Output
- [ ] 4. Widgets — and the One That Isn't There
- [ ] 5. Raw Mode & Keyboard Input
- [ ] 6. Cursor & Screen Control
- [ ] 7. The Event Loop
- [ ] 8. Layout: Width, Truncation & Columns

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
