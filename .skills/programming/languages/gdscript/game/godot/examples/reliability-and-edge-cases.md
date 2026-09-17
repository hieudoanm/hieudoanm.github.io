# Godot Best Practices: 4. Resources & Data

## Source guidance

This example applies the **4. Resources & Data** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Resource` (`.tres`/`.gd`-derived) for data-driven config — abilities, stats, levels:**
- **`preload` shared Resources for const-like singletons; `load` for spawned items.**
- **`Resource` ids stable; serialization (JSON) versioned for saved games.**

## Example

```gdscript
class_name EnemyStats extends Resource
@export var max_hp := 100
@export var damage := 10
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for godot-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
