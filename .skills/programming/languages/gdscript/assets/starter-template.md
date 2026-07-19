# GDScript Best Practices: Starter Template

A reusable starting point derived from the **1. Typing & Style** section of [GDScript Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```gdscript
extends Node2D

@export var speed: float = 300.0

var _health: int = 100

func _move(delta: float) -> void:
    position += direction * speed * delta
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
