# Cocos Creator Best Practices: Validation Plan

Use this plan to verify work guided by [Cocos Creator Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **The usual engine laws**: pool objects (NodePool) over node.destroy/instantiate spam; prefab caching for spawned actors:
- [ ] **update(dt) does only the frame's work** — hoist allocations, avoid creating strings/nodes/objects per frame
- [ ] **Text/label/Tween batching** — scheduled tweens over update for UI animation where possible
- [ ] **Batcher-friendly**: fewer unique materials/nodes, sprites with atlas packing, no per-frame setScale storms
- [ ] **Profiler verdict first** (Profiler, or WebGL frame inspector) before micro-optimizations — the frame budget is the metric
- [ ] **Pure logic tested without the engine** — state machines, math, balance config:
- [ ] **JS/browser functional tests for game-loop glue** where the engine is replaceable **(jsdom or headless GL with mocked cc)**
- [ ] **Contract tests for saves, wave configs, and input mapping tables.**
- [ ] **Deterministic seeds for any procedural/RNG-driven content.**

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
