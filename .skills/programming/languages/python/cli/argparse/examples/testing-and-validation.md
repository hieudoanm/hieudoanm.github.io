# Argparse Best Practices: 5. Testing

## Source guidance

This example applies the **5. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`main(argv=[...])` is testable without subprocess — pass args directly:**
- **Parsing table-tests**: input args × expected `args` namespace / exit code.
- **Contract cases**: missing required, unknown option, bad type, `-h`/`--help` output shape.

## Example

```python
def test_port_out_of_range(capsys):
    with pytest.raises(SystemExit):
        main(["--port", "99999", "file.txt"])
    out, err = capsys.readouterr()
    assert "out of range" in err
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for argparse-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
