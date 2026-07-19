# Overview

Focused reference for **unity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Unity Best Practices

Unity builds scenes from **GameObjects with `Component`s** — C# scripts attached to entities — and a per-frame game loop (`Update`/`FixedUpdate`). Practical Unity leans on **component-per-concern composition, SerializeField/`[RequireComponent]` as the editor contract, an event/store for cross-system communication**, and **object pooling + asset loading discipline so the runtime stays allocation-free in hot paths**`. Unity is data-driven: prefabs hold composition, scenes hold worlds, and scripts fill behaviors.

---

## 1. Project & Folder Structure

- **Folders as categories, names as contracts:**

```text
Assets/
  _Scripts/         # all C# source
    Core/           # pure logic, services, data (no MonoBehaviour)
    Components/     # behaviour components (one script per behaviour)
    Systems/        # managers, managers-as-orchestrators
    UI/             # canvas + view models
  Prefabs/
  Scenes/
  Resources/        # only what must load at runtime by path
  Plugins/
```

- **One component per file, named after behavior** (`Health.cs`, `PlayerMovement.cs`), never `Manager(Script)2.cs`.
- **Pure C# (`Core/`) without `UnityEngine` types where possible** — unit-testable, engine-independent logic.
- **`Resources/` used sparingly** — build-time references and bundles preferred; `Resources.Load` is a last resort (globally copied + unmanaged).

---

## 2. MonoBehaviour Lifecycle & Components

- **Scripts are `Component`s; the lifecycle is the contract:**

```csharp
public class Health : MonoBehaviour
{
    [SerializeField] private int _max = 100;
    public int Current { get; private set; }
    public event System.Action Died;

    private void Awake() => Current = _max;
    public void TakeDamage(int n)
    {
        Current = Mathf.Max(0, Current - n);
        if (Current == 0) Died?.Invoke();
    }
}
```

- **`Awake` (self-setup) / `OnEnable` (subscribe) / `Start` (others ready) / `OnDisable`+`OnDestroy` (unsubscribe)** — the observer/unsubscribe pairing is the classic leak:

```csharp
private void OnEnable()  => GameEvents.Scored += OnScored;
private void OnDisable() => GameEvents.Scored -= OnScored;
```

- **`Update` does frame work; `FixedUpdate` for physics; `LateUpdate` for camera after simulation.**
- **`[SerializeField]` for designer data — public fields for runtime-inspectable is a borderline smell.**
- **`GetComponent` at `Awake` and cache; never in `Update`.**
