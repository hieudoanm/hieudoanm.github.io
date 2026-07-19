# argh Best Practices: 4. Errors & Exit Codes

## Source guidance

This example applies the **4. Errors & Exit Codes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`argh::from_env()` panics on parse failure with argh's exit — acceptable for lean CLIs:**
- **Graceful exits: map parse errors to stderr + status; keep program errors separate.**
- **Test parsing via `FromArgs::from_args` against fixture arg slices.**

## Example

```rust
match Args::from_args(&["cli"], &env::args_os().collect::<Vec<_>>()) {
    Ok(args) => run(args),
    Err(err) => { eprintln!("{err}"); std::process::exit(1); }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for argh-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
