# Workflow notes

Focused reference for **argparse-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
