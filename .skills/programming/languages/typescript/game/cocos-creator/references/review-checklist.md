# Review checklist

Focused reference for **cocos-creator-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
