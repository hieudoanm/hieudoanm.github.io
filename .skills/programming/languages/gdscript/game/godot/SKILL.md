---
name: godot-best-practices
description: Best practices for building games with Godot — the scene-tree and engine conventions for GDScript/C# projects. Use when writing, structuring, or reviewing Godot projects — covers scene organization, nodes, the main loop, resources, inputs, audio, and export/optimization.
---

# Godot Best Practices

Godot is a **scene-based game engine** — everything is a tree of `Node`s, scenes are reusable `.tscn` containers, and the **main loop calls `_process`/`_physics_process` with `delta`**. Practical Godot leans on **composition via nested scenes, node paths resolved at `_ready` (`@onready`), signal-first communication, Resources for data-driven tweaks, and intentional scene resolution (fixed timestep)** — the scene tree IS the architecture; globals are the smell.

---

## 1. Scene Organization

- **Small, single-purpose scenes composed into bigger ones:**

```
Player/ (Player.tscn: Node2D)
├── Sprite2D
├── CollisionShape2D
└── Scripts/player.gd
```

- **One scene per gameplay entity; innermost scenes own their siblings/children.**
- **Instances (`preload`/`load`) over monolithic scenes** — prefab-style reuse.

---

## 2. Nodes & Communication

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

---

## 6. Export & Optimization

- **Export per platform with named presets; **keep resources imported** (texture import filters, atlases).**
- **Profiler first**: `Performance`/`Remote Inspector`; lazy-load heavy scenes; cache `get_node`/tilemap regions.
- **Deterministic builds**: export settings versioned, `project.godot` in VCS, no local-only hacks.
- **A/B publish pipeline** (dev + release tags) routed through export presets; hot paths measured, not guessed.

---

## General Rules of Thumb

- **Scenes are architecture: compose small scenes, one entity per scene.**
- **Signals for events; export-wired fields; groups for broadcasts.**
- **Integrate with `delta`; physics in `_physics_process`.**
- **Resources for data; InputMap for input; audio buses.**
- **Profile before optimizing; named export presets.**

---

## Quick-Start Checklist

- [ ] Small composed scenes; one scene per entity
- [ ] Signals/groups decoupling; `@onready` refs; no tree scans in loops
- [ ] `delta`-integrated movement; correct main-loop hooks
- [ ] `Resource` for stats/config; versioned saved-game serialization
- [ ] InputMap action handling; audio buses organized
- [ ] Export presets; profiler-guided optimization; VCS-clean project