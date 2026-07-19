# Godot Best Practices

Godot is a **scene-based game engine** — everything is a tree of Nodes, scenes are reusable .tscn containers, and the **main loop calls _process/_physics_process with delta**. Practical Godot leans on **composition via nested scenes, node paths resolved at _ready (@onready), signal-first communication, Resources for data-driven tweaks, and intentional scene resolution (fixed timestep)** — the scene tree IS the...

## When to use

Use when writing, structuring, or reviewing Godot projects.

## Core topics

- 1. Scene Organization
- 2. Nodes & Communication
- 3. The Main Loop
- 5. Input & Audio
- 6. Export & Optimization

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Godot Best Practices: Basic Usage](./examples/basic-usage.md)
- [Godot Best Practices: 4. Resources & Data](./examples/reliability-and-edge-cases.md)
- [Godot Best Practices: 3. The Main Loop](./examples/setup-and-configuration.md)
- [Godot Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Godot Best Practices: Decision Record](./assets/decision-record.md)
- [Godot Best Practices: Starter Template](./assets/starter-template.md)
- [Godot Best Practices: Validation Plan](./assets/validation-plan.md)
- [Godot Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
