# argh Best Practices: 5. Testing & Docs

## Source guidance

This example applies the **5. Testing & Docs** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit-test the parse layer — fixed arg vectors:**
- **Doc comments are the help — review `--help` output as a contract.**
- **Keep CLI surface small: opt-outs become subcommands, not flags all.**

## Example

```rust
#[test]
fn parses_passes() {
    let args = Args::from_args(&["cli"], &["--input", "x", "--passes", "4"]);
    assert_eq!(args.passes, 4);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for argh-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
