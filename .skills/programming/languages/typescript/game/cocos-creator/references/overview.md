# Overview

Focused reference for **cocos-creator-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
