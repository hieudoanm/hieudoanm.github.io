# Workflow notes

Focused reference for **spider-monkey-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. JIT Tiers & Ion

- **SM tiers: interpreter → Baseline → Ion (optimizing) — stable frequent loops warm up to Ion:**
- **Ion bails on type drift; keep accumulators one type (int stays int).**
- **Expected: hot functions hit Ion; check `--ion-monitoring` only when the profiler says the function is hot.**

---

## 3. Typed Structures & Works-with

- **Typed typed-arrays first-class (including `BigInt64Array`)— numeric tunnels native:**
- **Prefer `DataView`/typed views over bit-twiddling boxed objects for buffer IO.**
- **`ArrayBuffer` transferable across workers; structured cloning deliberate.**

---
