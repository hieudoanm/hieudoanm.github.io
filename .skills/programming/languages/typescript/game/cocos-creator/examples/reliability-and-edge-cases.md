# Cocos Creator Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **The usual engine laws**: pool objects (`NodePool`) over `node.destroy`/`instantiate` spam; `prefab` caching for spawned actors:
- **`update(dt)` does only the frame's work** — hoist allocations, avoid creating strings/nodes/objects per frame.
- **Text/label/Tween batching** — scheduled tweens over `update` for UI animation where possible.
- **Batcher-friendly**: fewer unique materials/nodes, sprites with atlas packing, no per-frame `setScale` storms.
- **Profiler verdict first** (`Profiler`, or WebGL frame inspector) before micro-optimizations — the frame budget is the metric.

## Example

```ts
this.pool = new NodePool();
const n = this.pool.get() ?? instantiate(this.template);
// ... spawn
this.pool.put(n);   // instantiated once, reused
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for cocos-creator-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
