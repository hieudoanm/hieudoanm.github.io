# Implementation notes

Focused reference for **argparse-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Sub-parsers get their own `help`/`description`** — `tool --help` and `tool start --help` both readable.

---

## 4. Help & UX

- **Every argument carries a `help=` string** — the user-facing help IS the spec:

```python
parser.add_argument("--config", default="config.yaml", help="path to config (default: %(default)s)")
```

- **`argparse` auto-generates usage**; you only add `epilog` for examples:

```python
parser = argparse.ArgumentParser(epilog="Example: tool start --port 9000 -v")
```

- **Exit codes by convention** — `parser.error` exits 2; `SystemExit` on `--help` exits 0; a wrapper `main` returns int so the console entry (`sys.exit(main())`) controls it.
- **`ArgumentDefaultsHelpFormatter`** for defaults-in-help.

---

## 5. Testing
