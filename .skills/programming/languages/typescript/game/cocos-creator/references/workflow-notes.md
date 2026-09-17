# Workflow notes

Focused reference for **cocos-creator-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
