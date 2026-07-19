# Workflow notes

Focused reference for **godot-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Signals for events, methods only for direct flows:**

```gdscript
signal guard_alerted(guard: Node2D)

func _on_detected(body: Node2D) -> void:
    guard_alerted.emit(self)
```

- **`@onready`/`$Path` for tree refs; `export` for design-time wiring (`setget`/`@export`) instead of hardcoded paths.**
- **Groups for broadcast (`add_to_group("enemies")`); never string-scanning the tree in `_process`.**
- **`call_deferred`/`await` for queue-flow safety (avoid freeing mid-callback).**

---

## 3. The Main Loop

- **`_physics_process(delta)` = fixed timestep (physics, movement); `_process(delta)` = per-frame visuals/UI:**

```gdscript
func _physics_process(delta: float) -> void:
    velocity = move_and_slide(velocity * delta)
```

- **Integrate with `delta` — frame-rate independent movement; never raw constant positions.**
- **`get_process_delta_time()`/`get_physics_process_delta_time()` when decoupled from the node loop.**

---
