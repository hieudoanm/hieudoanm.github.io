# Click Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`CliRunner` exercises the CLI end-to-end without subprocesses:**
- **Test the full group** — the command tree is the CLI contract; `invoke` from the root.
- **Contract cases**: missing argument, bad type/path, unknown option, `--help` output, and the error paths.

## Example

```python
from click.testing import CliRunner

def test_build(runner, tmp_path):
    p = tmp_path / "input.txt"; p.write_text("x")
    result = runner.invoke(cli, ["build", str(p)])
    assert result.exit_code == 0
    assert "building" in result.output
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for click-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
