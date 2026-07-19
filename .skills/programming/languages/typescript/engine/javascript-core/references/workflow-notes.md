# Workflow notes

Focused reference for **javascript-core-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. JIT Tiers & Warmup

- **JSC runs: baseline (interpreter), DFG (medium), FTL (optimizing) — tier-up paths come from call/structure frequency:**
- **Hot loops stabilized over warmup — benchmarks must warm up before timing (JSC benchmarks document this ceremony).**
- **Bailouts deopt from FTL — keep inner code `try`-free, type-stable; inspect `--log`/`ValidationField` debug harnesses (not prod).**

---

## 3. Typed Arrays & Big-Int

- **Typed arrays (including `BigInt64Array`) map to native memory — good for numeric tunnels:**
- **Int64-ish work via BigInt for exactness; avoid `>>` on large bitmasks unless Smi-range.**
- **`ArrayBuffer` transferable across workers; `structuredClone` for structured payloads.**

---

## 4. Memory & GC (JSC's generational GC)

- **JSC GC = semi-space + mark-sweep; allocation counts drive `--gc-observation`:**
- **Short-lived objects stay in youngest heap; watch retention in `heap` snapshots (Safari/Mac instrumentation).**
- **`FinalizationRegistry` for deterministic teardown where lifecycles matter.**
