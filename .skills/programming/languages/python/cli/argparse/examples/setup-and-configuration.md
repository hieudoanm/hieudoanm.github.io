# Argparse Best Practices: 2. Arguments & Types

## Source guidance

This example applies the **2. Arguments & Types** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`type=` callable handles the conversion** (int, float, a function) — parse/validate at the boundary:
- **`nargs` deliberate**: `REMAINDER` for pass-through args, `*` for positionals, `count` for `-v -v`.
- **Mutually exclusive options** via `add_mutually_exclusive_group`; `required=True` on the group for one-of-many contracts.
- **`action="store_true"` for flags; `.store_const`/`append` for the repeated case.**
- **`action="append"` for repeatable flags** — `--tag a --tag b` → `["a", "b"]`.

## Example

```python
def port(s: str) -> int:
    v = int(s)
    if not 0 < v < 65536:
        raise argparse.ArgumentTypeError("port out of range")
    return v

parser.add_argument("--port", type=port, default=8080)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for argparse-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
