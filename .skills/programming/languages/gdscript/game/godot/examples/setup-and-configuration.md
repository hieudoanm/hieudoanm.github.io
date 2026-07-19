# Godot Best Practices: 3. The Main Loop

## Source guidance

This example applies the **3. The Main Loop** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`_physics_process(delta)` = fixed timestep (physics, movement); `_process(delta)` = per-frame visuals/UI:**
- **Integrate with `delta` — frame-rate independent movement; never raw constant positions.**
- **`get_process_delta_time()`/`get_physics_process_delta_time()` when decoupled from the node loop.**

## Example

```gdscript
func _physics_process(delta: float) -> void:
    velocity = move_and_slide(velocity * delta)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for godot-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
