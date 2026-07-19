# Implementation notes

Focused reference for **godot-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Resources & Data

- **`Resource` (`.tres`/`.gd`-derived) for data-driven config — abilities, stats, levels:**

```gdscript
class_name EnemyStats extends Resource
@export var max_hp := 100
@export var damage := 10
```

- **`preload` shared Resources for const-like singletons; `load` for spawned items.**
- **`Resource` ids stable; serialization (JSON) versioned for saved games.**

---

## 5. Input & Audio

- **InputMap actions over raw keys** (`ui_accept`, `move_left`) — rebindable, multi-device:

```gdscript
func _input(event: InputEvent) -> void:
    if event.is_action_pressed("jump"):
        _jump()
```

- **`Input.get_axis`/`get_vector` for directional input; `is_action_just_pressed` in `_physics_process`.**
- **Audio buses for routing; `AudioStreamPlayer` nodes per sound type; preloaded streams.**
- **No stream-file mayhem — organize `res://audio/` by category.**
