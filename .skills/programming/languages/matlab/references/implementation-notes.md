# Implementation notes

Focused reference for **matlab-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
