# Overview

Focused reference for **godot-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
