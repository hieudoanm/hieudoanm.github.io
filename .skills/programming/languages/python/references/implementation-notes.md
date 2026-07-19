# Implementation notes

Focused reference for **python-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Paths & File I/O

- **`pathlib.Path` over `os.path`** — composable, readable, cross-platform:

```python
path: Path = Path.home() / "config" / "app.yaml"
if path.exists():
    data = path.read_text()
```

- **Use the `Path` methods** (`read_text`, `write_text`, `glob`, `iterdir`, `with_suffix`) instead of `open()`/string concatenation; build paths with `/`, never `+` or f-strings.
- **Files: use `with open(...)`** — you get guaranteed close; **binary vs text explicit** via `"rb"`/`"r"` vs `Path.read_bytes()`/`read_text()`.
- **Check-then-act races: prefer catch-and-handle** for existence checks (`try: path.read_text() except FileNotFoundError: ...`) over `if exists()` + read.

---

## 6. Iteration & Generators

- **Generators over materialized lists for large sequences** — `yield` one item at a time instead of building a whole list in memory:

```python
def walk_rows(rows: Iterable[Row]) -> Iterator[Row]:
    for row in rows:
        if row.active:
            yield row
```

- **Comprehensions over `for`-with-`append`** — `[f(x) for x in xs if c(x)]` expresses intent in one line; avoid abusing them with side effects.
- **Prefer iterators and `itertools`** — `islice`, `groupby`, `chain`, `takewhile` read as data pipelines instead of indexed loops.
- **Never modify a list while iterating it** — build a new list/`filter` or iterate over a copy.
- **`dict`/`set`/`Counter` for grouping and counting** over manual accumulate; `collections.defaultdict` for nested.

---

## 7. Functions & Idioms

- **Small, single-purpose functions** — if a function needs paragraphs to explain, split it; keep the happy path flat with early returns.
- **Explicit parameters over tricks** — prefer keyword-only args (`def make(name, *, force: bool = False)`) for option-like flags, default values over sentinel-mutation.
- **Context managers (`with`) for resources and scoped state** — `with open`, `with lock`, `with timer` — never hand-manage `enter`/`exit`.
- **`match` statement (3.10+) over deep `if` chains** for dispatch on structure — and `match` over `Enum` variants is exhaustive-seeming by convention.
- **Prefer built-ins and stdlib before third-party deps** — `functools`, `itertools`, `pathlib`, `dataclasses`, `typing`, `collections` cover most needs; the stdlib is the default contract.
- **`functools.wraps`/decorators for cross-cutting concerns** sparingly — a decorator hides control flow; reach for it when it genuinely removes duplication.

---
