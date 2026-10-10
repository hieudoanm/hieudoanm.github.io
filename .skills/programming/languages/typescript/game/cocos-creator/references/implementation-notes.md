# Implementation notes

Focused reference for **cocos-creator-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Components remain pure renderers/react to the store; the store owns truth.**
- **Save/load via `sys.localStorage` (or file) with a versioned schema** — never ship an unreadable old save.
- **Deterministic game loops** — fixed-timestep updates for physics/logic (or dt-clamped), never wall-clock dependent gameplay.

---

## 6. Assets & Loading

- **Preload what gameplay needs at scene load**; `resources.load`/`bundle.load` only for late stuff:

```ts
bundle.load<AudioClip>("audio/coin", AudioClip, (err, clip) => {
  if (!err) this.audioSource.playOneShot(clip);
});
```

- **Asset references in prefabs/types via `@property({ type: SpriteFrame })`** — the editor binds them; no runtime path strings for things you can serialize.
- **Audio/meshes/textures into bundles with a load plan** — the first scene shouldn't silently fetch everything.
- **Versioning/CDN**: Cocos caches built assets; keep your bundle/folder structure stable across releases.
- **One-shot load errors handled** — a missing asset fails loud (`err`), not silent empty sprite.

---

## 7. Performance

- **The usual engine laws**: pool objects (`NodePool`) over `node.destroy`/`instantiate` spam; `prefab` caching for spawned actors:

```ts
this.pool = new NodePool();
const n = this.pool.get() ?? instantiate(this.template);
// ... spawn
this.pool.put(n);   // instantiated once, reused
```

- **`update(dt)` does only the frame's work** — hoist allocations, avoid creating strings/nodes/objects per frame.
- **Text/label/Tween batching** — scheduled tweens over `update` for UI animation where possible.
- **Batcher-friendly**: fewer unique materials/nodes, sprites with atlas packing, no per-frame `setScale` storms.
- **Profiler verdict first** (`Profiler`, or WebGL frame inspector) before micro-optimizations — the frame budget is the metric.

---

## 8. Build & Release Pipeline

- **Build via `BuildOptions`/CLI configured, not clicked** — reproducible CI:
