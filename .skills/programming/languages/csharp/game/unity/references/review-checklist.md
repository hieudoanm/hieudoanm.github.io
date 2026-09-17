# Review checklist

Focused reference for **unity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
