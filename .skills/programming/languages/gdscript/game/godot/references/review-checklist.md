# Review checklist

Focused reference for **godot-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Export & Optimization

- **Export per platform with named presets; **keep resources imported** (texture import filters, atlases).**
- **Profiler first**: `Performance`/`Remote Inspector`; lazy-load heavy scenes; cache `get_node`/tilemap regions.
- **Deterministic builds**: export settings versioned, `project.godot` in VCS, no local-only hacks.
- **A/B publish pipeline** (dev + release tags) routed through export presets; hot paths measured, not guessed.

---

## General Rules of Thumb

- **Scenes are architecture: compose small scenes, one entity per scene.**
- **Signals for events; export-wired fields; groups for broadcasts.**
- **Integrate with `delta`; physics in `_physics_process`.**
- **Resources for data; InputMap for input; audio buses.**
- **Profile before optimizing; named export presets.**

---

## Quick-Start Checklist

- [ ] Small composed scenes; one scene per entity
- [ ] Signals/groups decoupling; `@onready` refs; no tree scans in loops
- [ ] `delta`-integrated movement; correct main-loop hooks
- [ ] `Resource` for stats/config; versioned saved-game serialization
- [ ] InputMap action handling; audio buses organized
- [ ] Export presets; profiler-guided optimization; VCS-clean project
