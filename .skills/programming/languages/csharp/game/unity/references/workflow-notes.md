# Workflow notes

Focused reference for **unity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. Scene & Prefab Composition

- **Build scenes from prefabs** — one prefab per entity type; variants (`Prefab` → `Prefab Variant`) over copy-paste:

```csharp
// Player prefab: PlayerMovement + Health + Weapon (components in the prefab, tuned via inspector)
```

- **Prefab = composition contract**: designer tweaks numbers; code owns invariants.
- **Scene root object per system** (`GameSystems`) wires managers; prefabs reference managers via events/injection, not by scraping the hierarchy.
- **`FindObjectOfType`/`GetComponentInParent` at runtime is a smell** — wired references (serialized) or events over magical lookups.

---

## 4. Events & Cross-System Communication

- **A static event bus / C# events to decouple systems**:

```csharp
public static class GameEvents
{
    public static event System.Action<int> ScoreChanged;
    public static void RaiseScore(int s) => ScoreChanged?.Invoke(s);
}
```

- **Subscribe/unsubscribe paired explicitly** (`OnEnable`/`OnDisable`) — leaked static listeners keep dead objects alive.
- **For state-heavy games, a minimal store/`ScriptableObject`-event pattern is fine — pick one pattern and be consistent**; avoid ten ad-hoc singleton managers.
- **`ScriptableObject` events + variables** (`SOEvent`, `SOVariable`) pair beautifully with prefab references — data-driven without code coupling.
- **Never mutating scene state from an arbitrary component** — route through events/services so flows stay traceable.

---

## 5. Game Loop & Physics

- **Fixed timestep for physics; move by `Time.fixedDeltaTime`; scale-independent:**

```csharp
private void FixedUpdate() { rb.MovePosition(rb.position + moveDir * Time.fixedDeltaTime); }
```
