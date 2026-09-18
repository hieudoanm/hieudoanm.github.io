---
name: unity-best-practices
description: Best practices for building games with Unity (C#) — the framework conventions for Unity projects. Use when writing, structuring, or reviewing Unity C# — covers project structure, components/MonoBehaviours, the game loop, scene/prefab composition, events, asset loading, performance, and testing.
---

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

- **`Time.deltaTime` for camera/UI; clamp `dt` divides hitches** (`Mathf.Min(Time.deltaTime, 0.05f)` where gameplay depends).
- **Physics via `Rigidbody`/`Collider` events (`OnTriggerEnter`/`OnCollisionEnter`)** — never per-pair manual raycasts where the engine handles contacts.
- **Keep `FixedUpdate` authoritative for simulation; render/LateUpdate for presentation.**
- **Coroutines/Tasks carry lifetime risk** — hold a `CancellationTokenSource`/stop-scheduler pattern; `StopAllCoroutines` in `OnDisable` when they must stop.

---

## 6. Assets & Loading

- **Reference assets from prefabs/fields — never `Resources.Load` for things you can serialize:**

```csharp
[SerializeField] private AudioClip _coin;
```

- **`Addressables`/`AssetBundles` for content beyond the first scene** — catalog + keyed loads with failure handling:

```csharp
var handle = Addressables.LoadAssetAsync<Texture2D>(key);
var tex = await handle.Task;
```

- **Async loading with release discipline** — every `Load` has a paired `Release`/`ReleaseInstance` (memory leaks in asset trees are real).
- **One-shot load errors handled** — a failed `Addressables` load fails loud (`OnError`), not a forever-pending task.
- **`Preload` critical audio/textures** at scene load; per-level bundles loaded before the transition.

---

## 7. Performance

- **Profile the frame (`Profiler`, frame debugger) before optimizing** — "Unity is slow" is usually allocation or draw-call rose-colored glasses.
- **Hot-path laws:**
  - **Object pooling (`ObjectPool`/custom) for spawned actors/bullets/particles** — no `Instantiate/Destroy` spam.
  - **No per-frame allocation**: avoid allocating strings/lists/linq in `Update` (GC spikes).
  - **`Physics` queries batched; triggers expanded (substeps) understood.**
- **Draw calls**: batching/atlasing/mesh combiner; `Static Batching` for static geometry; GPU instancing where materials match.
- **Update loops stay tiny** — a component that scans `FindObjectsOfType` per frame is the perennial bug.

---

## 8. Build & Delivery

- **Build via an editor script / `-executeMethod` for reproducible CI**:

```csharp
[MenuItem("Build/Run WebGL")] public static void BuildWeb() { /* pipeline */ }
```

- **Scenes in build list explicit; asset bundles planned; `Resources` budget known.**
- **Platform packages verified** — icons, entitlements, signing, WebGL compression (`Brotli`), IL2CPP settings per target.
- **Player settings: `il2cpp` + stripping reviewed**; symbols + symbols folder shipped for crash analysis.
- **Download-size and first-load budget measured** — a bloated packaged build is a product issue.

---

## 9. Testing & Code Quality

- **Pure logic in `Core/` unit-tested (NUnit)** — state machines, math, save+schema, wave configs:

```csharp
[Test]
public void AddScore_GreaterThanBest_RaisesBest() { /* Core.GameState */ }
```

- **Testable seams**: components take injected services via `[SerializeField]` references or a service locator, never `FindObjectOfType`.
- **PlayMode tests for the flow glue** (spawns, events, scene transitions) — a couple, not a zoo.
- **Deterministic seeds for RNG-driven content; saves versioned and forward-compatible.**

---

## General Rules of Thumb

- **Component per concern; scenes composed from prefabs; scripts fill behavior.**
- **`SerializeField` for data; cached `GetComponent`; never scene-scraping at runtime.**
- **Events/`ScriptableObject` decouple systems; subscribe/unsubscribe paired.**
- **Pool spawnables; hot paths allocation-free; fixed timestep for physics.**
- **Reference assets at build time; `Addressables` with paired release.**
- **Profile the frame before optimizing; editor-scripted, reproducible builds.**

---

## Quick-Start Checklist

- [ ] Folder structure + one component per file; pure logic separated (`Core/`)
- [ ] Lifecycle discipline (`Awake`/`OnEnable`/`OnDisable`) with paired subscribe/unsubscribe
- [ ] Prefab composition; variant reuse; no `FindObjectOfType` at runtime
- [ ] `SerializeField` designer data; `GetComponent` cached in `Awake`
- [ ] `FixedUpdate` physics + `Update` frame presentation; clamped `Time.deltaTime`
- [ ] Event bus / SO-event decoupling; state in one store/service
- [ ] Prefab/field asset references over `Resources.Load`; `Addressables` + release
- [ ] Object pooling; no per-frame allocation; batched physics/draw calls
- [ ] Profiler before optimizing; CI/reproducible build scripts
- [ ] Core unit tests; PlayMode flow tests; deterministic seeds; versioned saves