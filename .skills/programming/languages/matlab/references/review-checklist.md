# Review checklist

Focused reference for **matlab-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 8. Performance & Profiling

- **Profile first** — `profile on`/`profile viewer`: optimize the measured 10%, not the guessed 50%.
- **The usual suspects in order** — unvectorized loops, growing arrays, in-loop I/O, recomputing static data, `cell`-vs-matrix indexing.
- **`parfor` for embarrassingly parallel independent iterations** (R2016b+ `parfor` w/ `tall`); know the loop-variable slicing rules.
- **Cache repeated heavy computations** (e.g., precomputed weight matrices, lookups) — but verify with the profiler before caching.
- **Precomputed/simplified paths in `live scripts` are for analysis; the hot function file is the product.**

---

## 9. Testing & Verification

- **`matlab.unittest` framework** — `testCase.assertEqual`/`verifyEqual` contract tests:

```matlab
classdef summarizeTest < matlab.unittest.TestCase
    methods (Test)
        function knownCase(testCase)
            [m, s] = summarize([1 2 3]);
            testCase.verifyEqual(m, 2, 'AbsTol', 1e-12);
        end
    end
end
```

- **Table-driven cases** — an input×expected block in a cell/table, iterated with a toggled-on row message.
- **Tolerances matter** — `AbsTol`/`RelTol` on floating asserts; never exact-equality on computed floats.
- **`checkcode`/`mlint` clean; run the whole suite with `runtests` in CI per release.**

---

## General Rules of Thumb

- **Think in arrays:** vectorize, preallocate, broadcast — loops are the last resort.
- **Functions are the product; scripts are the scratchpad.**
- **Every input validated; every error carries an identifier and message.**
- **Shape is the contract:** row/column, size intent, categorical vs numeric spelled out.
- **Every plot labeled; every concluding number in a test with a tolerance.**
- **`checkcode` + unit tests are part of "done".**

---

## Quick-Start Checklist

- [ ] Vectorized + implicit expansion over element loops; preallocated arrays
- [ ] Function files with explicit `[outs] = f(ins)`; no shared-workspace borrowing
- [ ] `validateattributes`/`mustBe*` at every input boundary
- [ ] `table`/`timetable`/`categorical` for structured/factor data; correct row/col
- [ ] `error('id:msg')` with identifiers; narrow `try/catch`; `rethrow(err)`
- [ ] `tiledlayout` + fully-labeled plots in output
- [ ] `profile on/off` before optimizing; `parfor` for independent heavy loops
- [ ] `matlab.unittest` with tolerances; `checkcode`/`mlint` clean
