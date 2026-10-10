# Workflow notes

Focused reference for **matlab-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
