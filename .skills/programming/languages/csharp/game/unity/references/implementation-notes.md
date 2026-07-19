# Implementation notes

Focused reference for **unity-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
