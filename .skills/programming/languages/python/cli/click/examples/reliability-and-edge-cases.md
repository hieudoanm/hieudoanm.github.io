# Click Best Practices: 2. Options & Arguments

## Source guidance

This example applies the **2. Options & Arguments** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Options = named flags, arguments = positional; typed via `type=`:**
- **`required=True` for the never-optional; `multiple=True` for repeatable; `count=True` for `-v -v`.**
- **`click.Path`/`click.File`/`click.Choice`/`click.IntRange` handle the common validation** at the boundary:
- **`show_default=True`** on options so help states default values explicitly:
- **Options parsed/env-variable fallback**: `envvar="PORT"` for secrets/config reads from the environment.

## Example

```python
@click.option("--port", type=int, default=8080, help="listen port")
@click.option("--tags", multiple=True, help="repeatable tag")
@click.argument("path", type=click.Path(exists=True, dir_okay=False))
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for click-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
