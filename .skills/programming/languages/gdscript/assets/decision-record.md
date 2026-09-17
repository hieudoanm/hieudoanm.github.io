# GDScript Best Practices: Decision Record

Use this record when applying [GDScript Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing games in GDScript — the Godot game-development language conventions. Use when writing, structuring, or reviewing GDScript — covers class structure, signals, exports, nodes, tree (_ready/_process/_physics_process), typing, and performance.

GDScript is **Godot's primary scripting language** — Python-flavored syntax with static typing, first-class signals, and a scene-tree model where nodes communicate via @onready, export, and signals. Practical GDScript leans on **strong typing (: int, -> void), signal-based decoupling over direct node pokes, exported vars for tweakable parameters, and correct loop hooks (_ready/_process/_physics_process)** — the tree, not globals, is the composition model.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Gdscript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Typing & Style
- [ ] 2. Signals for Communication
- [ ] 3. Node Lifecycle
- [ ] 4. Scenes & Composition
- [ ] 5. Performance & Memory
- [ ] 6. Errors & Debugging
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

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
