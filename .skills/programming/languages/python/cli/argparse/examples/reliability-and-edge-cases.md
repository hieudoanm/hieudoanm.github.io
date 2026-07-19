# Argparse Best Practices: 1. Parser Layout

## Source guidance

This example applies the **1. Parser Layout** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One `ArgumentParser` per CLI; named constants over magic strings; `prog` set explicitly:**
- **Parse in `main` and hand the `Namespace` to typed functions** — never spread `args.` lookups through deep code:
- **`default=` for every optional** — the help text is the contract.
- **`metavar`/`choices` documented** — `choices` enforces a closed set at parse time.

## Example

```python
def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    return run(path=args.path, verbose=args.verbose, port=args.port)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for argparse-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
