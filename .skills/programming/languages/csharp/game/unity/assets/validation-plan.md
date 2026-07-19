# Unity Best Practices: Validation Plan

Use this plan to verify work guided by [Unity Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Pure logic in Core/ unit-tested (NUnit)** — state machines, math, save+schema, wave configs:
- [ ] **Testable seams**: components take injected services via [SerializeField] references or a service locator, never FindObjectOfType
- [ ] **PlayMode tests for the flow glue** (spawns, events, scene transitions) — a couple, not a zoo
- [ ] **Deterministic seeds for RNG-driven content; saves versioned and forward-compatible.**
- [ ] **Profile the frame (Profiler, frame debugger) before optimizing** — "Unity is slow" is usually allocation or draw-call rose-colored glasses
- [ ] **Hot-path laws:**
- [ ] **Object pooling (ObjectPool/custom) for spawned actors/bullets/particles** — no Instantiate/Destroy spam
- [ ] **No per-frame allocation**: avoid allocating strings/lists/linq in Update (GC spikes)
- [ ] **Physics queries batched; triggers expanded (substeps) understood.**
- [ ] **Draw calls**: batching/atlasing/mesh combiner; Static Batching for static geometry; GPU instancing where materials match

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
