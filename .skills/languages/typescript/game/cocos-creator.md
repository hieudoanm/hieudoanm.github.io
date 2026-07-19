---
name: cocos-creator-best-practices
description: Best practices for building games with Cocos Creator — the framework conventions for 3D/2D games exported to web, iOS, and Android. Use when writing, structuring, or reviewing Cocos Creator projects — covers project structure, components/scenes, the component lifecycle, state management, asset loading, performance, and the build pipeline.
---

# Cocos Creator Best Practices

Cocos Creator is a component-based game engine (TypeScript-first) where **scenes /prefabs/are composed of nodes and `Component`s** with a well-defined lifecycle (`onLoad` → `start` → `update` → `onDestroy`). Practical Cocos Creator leans on **one responsibility per component, scene graph assembled from prefabs (not ad-hoc scripts), a `Director`/`EventTarget` bus for cross-system events**, and **asset bundles with explicit preloading for the shipping build**. The editor is the composition root; code fills the behavior.

---

## 1. Project & Directory Structure

- **Cap-everything kinds cleanly** — assets by functional folder, scripts colocated with their scene/prefab:

```text
assets/
  scenes/            # entry and level scenes
  prefabs/           # reusable node trees
  components/        # behavior scripts (component name == file)
  bundles/           # on-demand asset bundles
  resources/         # runtime-dynamic resources (preload/singletons)
  scripts/           # pure logic, services, config (no Node deps)
```

- **One component per file; name it after behavior** (`PlayerController.ts`, `WaveSpawner.ts`), not `Update1.ts`.
- **Pure TS logic (math, state machines, services) in `scripts/` without `cc` imports** — unit-testable separate from the engine.
- **`resources`/`bundle` discipline** — everything referenced by prefab should be a serialized asset reference, not `resources.load` last-minute.

---

## 2. Components & Lifecycle

- **Components are behaviors; `@ccclass` + props make them designer-editable:**

```ts
@ccclass("Health")
export class Health extends Component {
  @property({ type: Number })
  max = 100;
  get current() { return this._current; }
  private _current = 100;

  takeDamage(n: number) {
    this._current = Math.max(0, this._current - n);
    if (this._current === 0) this.node.emit("died");
  }
}
```

- **Lifecycle shape respected**: `onLoad` (self setup), `start` (depends ready), `update(dt)` (per-frame — keep it small), `onDestroy` (unsubscribe/cleanup):

```ts
onLoad() {
  this.schedule(this.scoreTick, 1, CC_REPEAT_FOREVER, 0);
}
onDestroy() {
  this.unscheduleAllCallbacks();
}
```

- **dt clamped before use**; never multiply into unbounded growth — `Math.min(dt, 0.05)` guards hitches.
- **Components communicate by events (`node.emit`/`node.on`) — not by reaching into sibling components' internals.**
- **`@property` for everything designer needs; internal state stays private** — the inspector is a contract, not a hole.

---

## 3. Scene & Prefab Composition

- **Build the scene tree from prefabs** — a scene that is one giant hand-built hierarchy is unmaintable; prefab = reusable assembly.

```
Scene
 └ GameRoot (UI + input bus)
   ├ HUD (prefab)
   ├ Player (prefab -> PlayerController)
   └ Enemies (prefab -> WaveSpawner)
```

- **Prefab reuse over copy-paste**: one prefab + variants (via props) over duplicated nodes.
- **Scene entry scripts** (`GameRoot`) initialize systems, wiring signals to services — the scene graph is the wiring diagram.
- **Avoid deep *component* coupling — resolve at the top (a Director/`EventTarget` bus) and pass down.**

---

## 4. Input & Events

- **Prefer the node event system for game logic** — `node.on("died", ...)`, `node.emit` — typed via a shared event-name module:

```ts
export const Events = { DIED: "game/player-died", SCORED: "game/scored" } as const;
```

- **Input (`Input.on(Input.EventType.KEY_DOWN, cb)`) at the entry, dispatched as game events** — input mapping is config, not business logic.
- **Local vs global events**: component-local (`node`) for the subtree, `director`/`EventTarget` bus for cross-system (hud ↔ gameplay).
- **Unsubscribe everything in `onDestroy`** — leaked listeners are the classic cross-scene bug.

---

## 5. State & Data

- **Game state in typed services** (a store/`EventTarget` hub), not scattered across components:

```ts
class GameState extends EventTarget {
  score = 0;
  level = 1;
  addScore(n: number) { this.score += n; this.dispatch("score", this.score); }
}
```

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

```bash
cocos build --platform web-mobile --config buildConfig.json
```

- **Bundle config deliberate**: main bundle lean, gameplay/audio in on-demand bundles; `resources` used only when serialization can't.
- **Asset versioning on**; compression (`--build-md5Cache`, texture compression for the target) applied.
- **Apple/Android package steps verified** — entitlements, signings, and the GPU/API features the game relies on.
- **Download size & memory budget measured at the profile scope** — a bloated web build is the first production complaint.

---

## 9. Testing

- **Pure logic tested without the engine** — state machines, math, balance config:

```ts
describe("GameState", () => {
  test("addScore accumulates and dispatches", () => {
    const s = new GameState();
    const fn = vi.fn();
    s.addEventListener("score", fn);
    s.addScore(5);
    expect(s.score).toBe(5);
    expect(fn).toHaveBeenCalledWith(5);
  });
});
```

- **JS/browser functional tests for game-loop glue** where the engine is replaceable **(jsdom or headless GL with mocked cc)**.
- **Contract tests for saves, wave configs, and input mapping tables.**
- **Deterministic seeds for any procedural/RNG-driven content.**

---

## General Rules of Thumb

- **One component per behavior; pure logic lives outside the `cc` layer and is unit-tested.**
- **The scene graph is composed from prefabs; scripts fill behavior, not node bureaucracy.**
- **Events /store for cross-system flow; components render/predicate state.**
- **Pool spawnables; update stays tiny; frames budget profiled before anything.**
- **Assets preloaded/bundled for the release target; errors fail loud.**

---

## Quick-Start Checklist

- [ ] Folder structure (scenes/prefabs/components/bundles/scripts) and one component per file
- [ ] Lifecycle (`onLoad`/`start`/`update`/`onDestroy`) with dt clamp and cleanup
- [ ] Prefab composition; designer-editable `@property`; no component reach-ins
- [ ] Typed event hub / store; input mapped once at entry; unsubscribed in `onDestroy`
- [ ] Save schema versioned; game loop deterministic
- [ ] Asset bundles + preload plan; `resources.load` for late only; load errors handled
- [ ] `NodePool` spawn recycling; no per-frame allocation; atlas/materials batcher-friendly
- [ ] CLI/configurable build; asset versioning; platform package steps verified
- [ ] Pure-logic unit tests; save/input/wave contract tests; seeded determinism