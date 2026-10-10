# Python Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Narrow, specific `except`** — catch `ValueError` where `ValueError` is possible, not bare `except:`. Broad catches (`except Exception`) hide failure paths; broad swallows (`except Exception: pass`) are almost always wrong.
- **Raise with context and chaining** — `raise ... from cause` preserves the original traceback and makes causality explicit:
- **`if`/`raise` guards before doing work** (fail fast); **`assert` only for programmer invariants**, which the interpreter can strip with `-O`.
- **Log, don't print, in libraries and services** — routing through `logging` keeps control of sinks and formats at the app boundary.

## Example

```python
try:
    return int(raw)
except ValueError:
    log.warning("not an int: %r", raw)
    return 0
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for python-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
