# Workflow notes

Focused reference for **click-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`required=True` for the never-optional; `multiple=True` for repeatable; `count=True` for `-v -v`.**
- **`click.Path`/`click.File`/`click.Choice`/`click.IntRange` handle the common validation** at the boundary:

```python
click.choice(["dev", "stage", "prod"])
click.IntRange(1, 65536)
```

- **`show_default=True`** on options so help states default values explicitly:

```python
@click.option("--port", default=8080, show_default=True, help="listen port")
```

- **Options parsed/env-variable fallback**: `envvar="PORT"` for secrets/config reads from the environment.

---

## 3. Types & Conversion

- **Custom types via `click.ParamType`** for the genuinely repeated shapes:

```python
class Port(click.ParamType):
    name = "port"
    def convert(self, value, param, ctx):
        v = int(value)
        if not 0 < v < 65536:
            self.fail(f"{value!r} is not a valid port", param, ctx)
        return v
```

- **`type=str` default; `ClickException` for clean error messages over raw raises** — convert domain errors to `click.UsageError`/`ClickException`.

---
