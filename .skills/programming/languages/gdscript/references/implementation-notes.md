# Implementation notes

Focused reference for **gdscript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
