# Godot Best Practices: Basic Usage

Best practices for building games with Godot — the scene-tree and engine conventions for GDScript/C# projects. Use when writing, structuring, or reviewing Godot projects — covers scene organization, nodes, the main loop, resources, inputs, audio, and export/optimization.

## Scenario

Use this example as a starting point when applying **godot-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Nodes & Communication** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```gdscript
signal guard_alerted(guard: Node2D)

func _on_detected(body: Node2D) -> void:
    guard_alerted.emit(self)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
