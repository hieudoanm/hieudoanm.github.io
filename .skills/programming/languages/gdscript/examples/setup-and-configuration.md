# GDScript Best Practices: 2. Signals for Communication

## Source guidance

This example applies the **2. Signals for Communication** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Signals decouple nodes — emit events, not commands:**
- **Connect via editor/code deliberately; prefer `health_changed.connect(...)` over polling.**
- **Signal args typed — document contract in the signal declaration.**
- **Use `get_tree()` (not scene globals) for tree-wide events where appropriate.**

## Example

```gdscript
signal health_changed(current: int, max: int)

func take_damage(amount: int) -> void:
    _health = maxi(0, _health - amount)
    health_changed.emit(_health, _max_health)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for gdscript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
