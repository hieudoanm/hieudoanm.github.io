---
name: gdscript-best-practices
description: Best practices for writing games in GDScript — the Godot game-development language conventions. Use when writing, structuring, or reviewing GDScript — covers class structure, signals, exports, nodes, tree (_ready/_process/_physics_process), typing, and performance.
---

# GDScript Best Practices

GDScript is **Godot's primary scripting language** — Python-flavored syntax with static typing, first-class `signal`s, and a scene-tree model where nodes communicate via `@onready`, `export`, and signals. Practical GDScript leans on **strong typing (`: int`, `-> void`), signal-based decoupling over direct node pokes, exported vars for tweakable parameters, and correct loop hooks (`_ready`/`_process`/`_physics_process`)** — the tree, not globals, is the composition model.

---

## 1. Typing & Style

- **Type every variable/parameter/return:**

```gdscript
extends Node2D

@export var speed: float = 300.0

var _health: int = 100

func _move(delta: float) -> void:
    position += direction * speed * delta
```

- **`@export` for inspector-tweakable design values; `const` over `var` where invariant.**
- **snake_case members, PascalCase classes; typed arrays (`Array[int]`), enums in PascalCase.**
- **`static func` (no `self` use) + `@static_unload` for pure helpers.**

---

## 2. Signals for Communication

- **Signals decouple nodes — emit events, not commands:**

```gdscript
signal health_changed(current: int, max: int)

func take_damage(amount: int) -> void:
    _health = maxi(0, _health - amount)
    health_changed.emit(_health, _max_health)
```

- **Connect via editor/code deliberately; prefer `health_changed.connect(...)` over polling.**
- **Signal args typed — document contract in the signal declaration.**
- **Use `get_tree()` (not scene globals) for tree-wide events where appropriate.**

---

## 3. Node Lifecycle

- **Reference peers/siblings in `_ready()`, not `_init()` (tree unready at `_init`):**

```gdscript
@onready var label := $HUD/Label

func _init() -> void:
    self.name = "Player"   # no tree children yet

func _ready() -> void:
    _subscribe()           # tree ready — connect signals here
```

- **`_process(delta)` per-frame; `_physics_process(delta)` for physics steps (fixed timestep).**
- **Remove with `queue_free()`, never `free()` mid-frame; check `is_inside_tree()` before tree access.**

---

## 4. Scenes & Composition

- **One scene per node-type; composition over inheritance (prefabs build trees).**
- **`get_node` via `@onready` path or `@export NodePath`; children owned by their parent.**
- **Groups for cross-cutting (`add_to_group("enemies")`); `get_tree().call_group(...)` avoids coupling.**

---

## 5. Performance & Memory

- **Reuse/`pool` where hot (bullets, particles) — `queue_free` on death, spawn via preloaded scenes:**
- **`get_node`/paths cached (`@onready`); string lookups in `_process` are the slow path.**
- **`@export` typed + `@tool` scripts only where the editor benefit is real.**
- **Avoid allocations in `_process` (temp arrays/strings); dirty-flag the work outside the frame.**

---

## 6. Errors & Debugging

- **Assert invariants (`assert`), `push_error`/`push_warning` for routed diagnostics.**
- **`@onready` failing = wrong path — fail fast with clear node paths.**
- **Deterministic loops: fixed `delta` on `_physics_process` for physics-driven logic.**
- **Signed-off game feel: tune exported constants in editor; unit-test pure logic scripts (`gdunit`/GUT) for non-tree code.**

---

## General Rules of Thumb

- **Typed GDScript; exported tweakables; consts for invariants.**
- **Signals over direct node pokes; groups for cross-cutting.**
- **`_ready` for tree refs; `_physics_process` for physics; `queue_free` cleanly.**
- **Cache nodes/strings; no hot-loop allocations.**
- **Composition via scenes; fail-fast with asserts.**

---

## Quick-Start Checklist

- [ ] Full typing (`: int`, `-> void`); `@export` tweakables
- [ ] `signal` decoupling; typed signal args; grouped tree calls
- [ ] `@onready` for node refs; lifecycle hooks correct (`_ready`/`_process`/`_physics_process`)
- [ ] `queue_free()` lifecycle; `is_inside_tree()` checks
- [ ] Cached nodes/strings; no per-frame allocations
- [ ] Debug tools (asserts, push_error); GUT tests for pure logic