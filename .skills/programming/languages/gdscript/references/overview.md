# Overview

Focused reference for **gdscript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
