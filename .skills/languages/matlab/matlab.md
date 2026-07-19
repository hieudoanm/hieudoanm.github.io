---
name: matlab-best-practices
description: Best practices for writing MATLAB — the language conventions for numerical computing, data analysis, and prototyping. Use when writing, structuring, or reviewing MATLAB — covers vectorization, arrays, functions, types, error handling, plotting, performance, and tooling.
---

# MATLAB Best Practices

MATLAB is a language built around **arrays and linear-algebra primitives** — the whole point is to let the environment do heavy numeric work with few, clear operations. Practical MATLAB leans on **vectorized, preallocated arrays over growing loops, functions with explicit inputs/outputs over scripts with shared workspaces**, and **unit-testable, documented code (`function` files + `checkcode` + the test framework)**. Scripts are for exploration; functions are for product.

---

## 1. Arrays & Data Shape

- **Everything is an array** — scalars, vectors, matrices, N-D arrays; think in terms of the whole array, not elements:

```matlab
x = linspace(0, 2*pi, 1000);
y = sin(x);          % vectorized, no loop
```

- **Know row vs column** — a "vector" is `1 x n` or `n x 1`; ambiguity between row/column vectors is a classic silent-broadcast bug. Use column vectors (`(:)`) consistently for signal/sequence data.
- **`size`/`numel`/`length` chosen by intent** — `size(A)` for the shape contract, `numel(x)` for element count; avoid `length` on non-vectors.
- **Hidden dimensions**: `size(A, dim)` and trailing singleton dims — broadcast semantics in `.^`/`./` operators matter.
- **Indexing styles**: linear `A(k)`, subscript `A(i, j)`, logical masks `A(A > 0)` — pick per expression, prefer masks for filtering.

---

## 2. Vectorization over Loops

- **`for` loops are the last resort in hot paths** — array ops, `cumsum`, `diff`, `bsxfun`/implicit expansion first:

```matlab
y = sum(x.^2);                 % instead of for-loop accumulation
z = a ./ (1 + abs(b));         % elementwise with implicit expansion
```

- **Implicit expansion (`R2016b+`) replaces `bsxfun`** — `a .* b'` broadcasts columns against rows deliberately.
- **Loops still fine for inherently sequential work** (recursions, species-at-a-time models) — vectorize data-dense math, loop the genuinely serial.
- **`fprintf`/I/O outside the hot loop** — hoist parsing and logging out of the inner iteration.
- **`accumarray`/`histcounts`/`unique`+`groupsummary` for grouped reductions** over manual grouping loops.

---

## 3. Preallocation & Memory

- **Preallocate before loops** — growing an array in a loop (`x = [x new]`) is quadratic:

```matlab
out = zeros(n, 1);
for k = 1:n
   out(k) = compute(k);
end
```

- **`zeros(n, m)`/`nan(n, 1)`/`false(n,1)` known shapes up front**; matlab handles memory in blocks, but shape-first is the contract.
- **Prefer `ismember`/`unique`/`setdiff` over in-loop membership scans.**
- **Know copy-on-write (`MEX`-style caution)** — writing into an indexed view copies; materialize with `deal`/assignment when shared data is large.
- **Strings**: `string` arrays (`"a"`) vs char vectors (`'a'`) — use `string` for collections and text pipelines; validate the type at the boundary.

---

## 4. Functions & Modularity

- **One function per file (primary function), named by its file** — the file IS the API contract:

```matlab
function [meanX, stdX] = summarize(x)
    meanX = mean(x);
    stdX = std(x);
end
```

- **Explicit `[outs] = name(ins)` signatures** — never rely on the caller's workspace; scripts share state silently, functions don't.
- **`nargin`/`nargout` for optional behavior; `varargin` only for genuinely variable input.**
- **Validate inputs early** — `validateattributes`/`mustBePositive`, `mustBeReal` etc. define the contract in one line:

```matlab
validateattributes(x, {'numeric'}, {'vector','finite'}, mfilename, 'x');
```

- **Local subfunctions and helper functions in `+package/` folders** for reuse; private functions in `private/`.
- **Keep functions small** — a function over ~50 lines with multiple responsibilities is a script in disguise; split by transform.

---

## 5. Types & Structuring

- **`struct`/`table`/`timetable` chosen by shape** — arrays of numbers in matrices, heterogeneous records in `struct`/`table`, time-indexed directly in `timetable`:

```matlab
results = table(name, measured, unit);
results = sortrows(results, 'measured', 'descend');
```

- **`categorical` for factors** — ordinal/nominal grouping data keeps levels ordered and typed.
- **Cells for heterogeneous collections** (`{...}`), matrices for numeric-density — mixing them silently changes indexing semantics.
- **`classdef` (OOP) when state + methods belong together** (devices, experiment sessions); prefer plain functions for the common transform pipeline.
- **Property validation in `classdef`** (`properties(ValidationFunctions)`) encodes the data contract at the boundary.

---

## 6. Error Handling

- **Fail fast, fail early** — `error('id:reason', 'message %s', arg)` with identifier + message:

```matlab
if ~isreal(x) || any(isnan(x(:)))
    error('summarize:invalidInput', 'x must be real and finite.');
end
```

- **`assert` for invariants you know are true** in developer flows; `validateattributes` for user input.
- **`try/catch` only around the block that can fail** — narrow catches, and `rethrow(err)` keeps the stack:

```matlab
try
    data = loadfile(path);
catch err
    warning('summarize:load', 'failed to load %s: %s', path, err.message);
    data = [];
end
```

- **Prefer returning safe defaults + a status** over burying errors where a caller can't see them.
- **No silent `disp`-only error paths** — a failed transform should be visible in output or an explicit error.

---

## 7. Plotting & Visualization

- **`tiledlayout`/`nexttile` over `subplot`** — modern, axis-linked, layout-aware:

```matlab
tiledlayout(1, 2);
h = nexttile; plot(h, x, sin(x));
nexttile; plot(x, cos(x));
```

- **Label everything** — `xlabel`, `ylabel`, `title`, `legend` on the plot; an unlabeled axis is unverifiable science.
- **`yyaxis` for dual scales only when truly needed**; shared axis + legend reads better.
- **Save with resolution and size intent** — `exportgraphics(fig, file.png, 'Resolution', 300)` (vector formats via `'-depsc'` where appropriate).
- **Colors/styles from a palette, line styles distinct for grayscale** — accessibility is part of the artifact.

---

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
