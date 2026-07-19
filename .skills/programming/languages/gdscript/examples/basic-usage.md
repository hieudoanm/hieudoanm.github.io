# GDScript Best Practices: Basic Usage

Best practices for writing games in GDScript — the Godot game-development language conventions. Use when writing, structuring, or reviewing GDScript — covers class structure, signals, exports, nodes, tree (_ready/_process/_physics_process), typing, and performance.

## Scenario

Use this example as a starting point when applying **gdscript-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Typing & Style** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```gdscript
extends Node2D

@export var speed: float = 300.0

var _health: int = 100

func _move(delta: float) -> void:
    position += direction * speed * delta
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
