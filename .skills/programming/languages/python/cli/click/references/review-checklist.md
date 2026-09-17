# Review checklist

Focused reference for **click-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Testing

- **`CliRunner` exercises the CLI end-to-end without subprocesses:**

```python
from click.testing import CliRunner

def test_build(runner, tmp_path):
    p = tmp_path / "input.txt"; p.write_text("x")
    result = runner.invoke(cli, ["build", str(p)])
    assert result.exit_code == 0
    assert "building" in result.output
```

- **Test the full group** — the command tree is the CLI contract; `invoke` from the root.
- **Contract cases**: missing argument, bad type/path, unknown option, `--help` output, and the error paths.

---

## General Rules of Thumb

- **Decorators declare the contract; function signatures are tested, not parsed twice.**
- **Options typed (`type=`/`Choice`/`Path`/custom); defaults in help.**
- **`ctx.obj` shared wiring only; domain logic stays in services.**
- **`click.echo` output with style; non-interactive path first.**
- **`CliRunner`-tested integration; happy + error paths covered.**

---

## Quick-Start Checklist

- [ ] `@click.group`/`@click.command` tree; one function per command
- [ ] Typed options with `required`/`multiple`/`count`; `show_default=True`
- [ ] `click.Path`/`Choice`/`IntRange`/custom `ParamType` for validation
- [ ] `envvar` for config/secrets; `ctx.obj` for shared wiring only
- [ ] `click.echo` output; `click.style`; `epilog`/`help=` documented
- [ ] `CliRunner.invoke` tests incl. error paths and `--help`
