---
name: "mordant-best-practices"
description: "Best practices for building interactive terminal UIs in Kotlin with Mordant. Use when writing, structuring, or debugging a Mordant TUI — covers Gradle setup, terminal and ANSI capability detection, colors and styled output, widgets, raw mode and keyboard input, cursor and screen control, event loops, responsive layout, line endings, and testing with a terminal recorder, with suggested values."
tags:
  - "programming"
  - "language"
  - "kotlin"
  - "cli"
  - "mordant"
when_to_use: "Use when writing, structuring, or debugging a Mordant TUI."
prerequisites:
  - "Basic familiarity with Kotlin and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../clikt/SKILL.md"
  - "../../SKILL.md"
  - "../../ui/compose/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Mordant Best Practices

Mordant is a terminal rendering and input library: it detects what the terminal can do, renders widgets to it, and — in raw mode — reads individual keypresses. Best practice here is **detect, degrade, and keep rendering pure** — probe the terminal once instead of guessing from environment variables, build frames as plain strings that are trivial to assert, and treat the terminal as a resource you must restore no matter how the program exits.

This document is written against **Kotlin 2.4+ / Mordant 3.1+** and includes concrete values you can drop straight into code.

## When to use

Use when writing, structuring, or debugging a Mordant TUI.

## Prerequisites

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- Detect with terminal.terminalInfo; never sniff TERM or NO_COLOR yourself
- Construct one Terminal and pass it down; the probe result is cached per instance
- Keep the renderer a pure function of state — it is the cheapest test you will ever write
- enterRawModeOrNull() for anything that might not be a tty; try/finally around raw mode and the cursor, always
- Poll with a timeout (250 ms default) and treat the timeout as a real event
- readKeyOrNull is blocking and returns null on timeout; wrap long waits, never assume suspend
- Normalize KeyboardEvent into your own sealed type at the boundary; match letters with lowercase() + flags
- rawPrint + \r\n for repainted frames; println for ordinary messages

## Focus areas

- 1. Core Stack & Gradle Setup
- 2. Terminal & Capability Detection
- 3. Colors & Styled Output
- 4. Widgets — and the One That Isn't There
- 5. Raw Mode & Keyboard Input
- 6. Cursor & Screen Control
- 7. The Event Loop
- 8. Layout: Width, Truncation & Columns
- 9. Line Endings in Raw Mode
- 10. Testing
- 11. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
