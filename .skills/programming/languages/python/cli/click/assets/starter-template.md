# Click Best Practices: Starter Template

A reusable starting point derived from the **3. Types & Conversion** section of [Click Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
class Port(click.ParamType):
    name = "port"
    def convert(self, value, param, ctx):
        v = int(value)
        if not 0 < v < 65536:
            self.fail(f"{value!r} is not a valid port", param, ctx)
        return v
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
