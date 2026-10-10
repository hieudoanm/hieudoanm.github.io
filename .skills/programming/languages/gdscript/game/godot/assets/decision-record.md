# Godot Best Practices: Decision Record

Use this record when applying [Godot Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building games with Godot — the scene-tree and engine conventions for GDScript/C# projects. Use when writing, structuring, or reviewing Godot projects — covers scene organization, nodes, the main loop, resources, inputs, audio, and export/optimization.

Godot is a **scene-based game engine** — everything is a tree of Nodes, scenes are reusable .tscn containers, and the **main loop calls _process/_physics_process with delta**. Practical Godot leans on **composition via nested scenes, node paths resolved at _ready (@onready), signal-first communication, Resources for data-driven tweaks, and intentional scene resolution (fixed timestep)** — the scene tree IS the architecture; globals are the smell.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Gdscript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Scene Organization
- [ ] 2. Nodes & Communication
- [ ] 3. The Main Loop
- [ ] 4. Resources & Data
- [ ] 5. Input & Audio
- [ ] 6. Export & Optimization
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
