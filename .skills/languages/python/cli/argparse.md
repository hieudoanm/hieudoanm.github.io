---
name: argparse-best-practices
description: Best practices for writing Python CLIs with argparse — the stdlib command-line parser conventions. Use when writing, structuring, or reviewing argparse-based tools — covers parser layout, arguments, subcommands, validation, help text, typing, and testing.
---

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

## 2. Arguments & Types

- **`type=` callable handles the conversion** (int, float, a function) — parse/validate at the boundary:

```python
def port(s: str) -> int:
    v = int(s)
    if not 0 < v < 65536:
        raise argparse.ArgumentTypeError("port out of range")
    return v

parser.add_argument("--port", type=port, default=8080)
```

- **`nargs` deliberate**: `REMAINDER` for pass-through args, `*` for positionals, `count` for `-v -v`.
- **Mutually exclusive options** via `add_mutually_exclusive_group`; `required=True` on the group for one-of-many contracts.
- **`action="store_true"` for flags; `.store_const`/`append` for the repeated case.**
- **`action="append"` for repeatable flags** — `--tag a --tag b` → `["a", "b"]`.

---

## 3. Subcommands

- **`add_subparsers(dest="command", required=True)` for command trees** — each sub `add_parser(name, help=...)` owns its args:

```python
sub = parser.add_subparsers(dest="command", required=True)
start = sub.add_parser("start", help="start the service")
start.add_argument("--daemon", action="store_true")
```

- **Dispatch via a dict/`match` in `main`**, never buried `if` ladders:

```python
match args.command:
    case "start": return start_cmd(daemon=args.daemon)
    case "stop":  return stop_cmd()
    case _:       parser.error(f"unknown command: {args.command}")
```

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

- **`main(argv=[...])` is testable without subprocess — pass args directly:**

```python
def test_port_out_of_range(capsys):
    with pytest.raises(SystemExit):
        main(["--port", "99999", "file.txt"])
    out, err = capsys.readouterr()
    assert "out of range" in err
```

- **Parsing table-tests**: input args × expected `args` namespace / exit code.
- **Contract cases**: missing required, unknown option, bad type, `-h`/`--help` output shape.

---

## General Rules of Thumb

- **One parser per CLI; thin `main`; typed values with `type=` callables.**
- **`choices`/mutually-exclusive/`append` encode constraints at parse time.**
- **Subcommands = `add_subparsers` + dispatch dispatch**
- **Every arg documented (`help=`); defaults in help.**
- **`main(argv)` testable; exit codes by convention (error=2, help=0).**

---

## Quick-Start Checklist

- [ ] `prog`/`description` set; every arg has `help=` and a `default`
- [ ] `type=` callables parse+validate; `choices` for closed sets
- [ ] `main(argv)` thin; parse once; args handed to typed functions
- [ ] Subcommands via `add_subparsers` + dispatch
- [ ] `ArgumentDefaultsHelpFormatter`; epilog examples
- [ ] Table-tested parsing + `-h` shape; `main(argv)` tested directly