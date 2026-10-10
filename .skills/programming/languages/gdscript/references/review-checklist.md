# Review checklist

Focused reference for **gdscript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
