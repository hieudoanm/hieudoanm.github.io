# Godot Best Practices: Starter Template

A reusable starting point derived from the **2. Nodes & Communication** section of [Godot Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```gdscript
signal guard_alerted(guard: Node2D)

func _on_detected(body: Node2D) -> void:
    guard_alerted.emit(self)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
