# Workflow notes

Focused reference for **gdscript-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
