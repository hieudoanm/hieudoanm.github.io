# MATLAB Best Practices: Workflow Checklist

A practical run sheet for applying [MATLAB Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Arrays & Data Shape: **Everything is an array** — scalars, vectors, matrices, N-D arrays; think in terms of the whole array, not elements:
- [ ] 1. Arrays & Data Shape: **Know row vs column** — a "vector" is 1 x n or n x 1; ambiguity between row/column vectors is a classic silent-broadcast bug. Use column vectors ((:)) consistently for signal/sequence data
- [ ] 2. Vectorization over Loops: **for loops are the last resort in hot paths** — array ops, cumsum, diff, bsxfun/implicit expansion first:
- [ ] 2. Vectorization over Loops: **Implicit expansion (R2016b+) replaces bsxfun** — a .* b' broadcasts columns against rows deliberately
- [ ] 3. Preallocation & Memory: **Preallocate before loops** — growing an array in a loop (x = [x new]) is quadratic:
- [ ] 3. Preallocation & Memory: **zeros(n, m)/nan(n, 1)/false(n,1) known shapes up front**; matlab handles memory in blocks, but shape-first is the contract
- [ ] 4. Functions & Modularity: **One function per file (primary function), named by its file** — the file IS the API contract:
- [ ] 4. Functions & Modularity: **Explicit [outs] = name(ins) signatures** — never rely on the caller's workspace; scripts share state silently, functions don't
- [ ] 5. Types & Structuring: **struct/table/timetable chosen by shape** — arrays of numbers in matrices, heterogeneous records in struct/table, time-indexed directly in timetable:
- [ ] 5. Types & Structuring: **categorical for factors** — ordinal/nominal grouping data keeps levels ordered and typed

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
