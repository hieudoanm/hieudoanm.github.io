# Argparse Best Practices: Starter Template

A reusable starting point derived from the **2. Arguments & Types** section of [Argparse Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
def port(s: str) -> int:
    v = int(s)
    if not 0 < v < 65536:
        raise argparse.ArgumentTypeError("port out of range")
    return v

parser.add_argument("--port", type=port, default=8080)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
