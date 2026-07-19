# Overview

Focused reference for **matlab-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
