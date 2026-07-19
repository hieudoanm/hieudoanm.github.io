# Overview

Focused reference for **argparse-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Argparse Best Practices

`argparse` is Python's standard-library CLI parser — **`ArgumentParser`, `add_argument` declarations, and a `Namespace` of parsed values**. Practical argparse leans on **`prog`-and-`description` self-documenting help, `dest`-aware names, type-callables for parsing, and `add_subparsers` for command trees**. Parse once at the `main` boundary; keep the parsing layer thin and the domain logic parseable by tests.

---

## 1. Parser Layout

- **One `ArgumentParser` per CLI; named constants over magic strings; `prog` set explicitly:**

```python
def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="tool", description="Do the thing.")
    parser.add_argument("path", help="input path")
    parser.add_argument("-v", "--verbose", action="store_true", help="verbose output")
    parser.add_argument("--port", type=int, default=8080, help="listen port")
    return parser
```

- **Parse in `main` and hand the `Namespace` to typed functions** — never spread `args.` lookups through deep code:

```python
def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    return run(path=args.path, verbose=args.verbose, port=args.port)
```

- **`default=` for every optional** — the help text is the contract.
- **`metavar`/`choices` documented** — `choices` enforces a closed set at parse time.

---
