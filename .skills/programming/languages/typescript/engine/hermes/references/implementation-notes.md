# Implementation notes

Focused reference for **hermes-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. React Native Integration

- **Enable Hermes consistent (RN 0.70+): `enableHermes: true` in `metro.config`/AppDelegate:**
- **Test on Hermes (not V8/Chrome-sim) — the engine is the runtime:**
  - modern indices, `Intl`, BigInt, `FinalizationRegistry` — cross-engine deltas documented.
- **`global.HermesInternal.getRuntimeProperties()` for self-diagnosis where versions differ.**

---

## 5. Compatibility & Debugging

- **Feature-set differs from V8 (some built-ins shimmed) — polyfill the seams:**
- **Debug via the official Hermes CLI (`hermesc`/`hermes`) + Metro for bytecode checks; repro visually in RN.**
- **Debug via RN's Hermes DevTools protocol (Chrome DevTools → Hermes); console/perf tooling in RN.**

---

## General Rules of Thumb
