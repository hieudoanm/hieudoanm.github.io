# argh Best Practices: 2. Positionals & Switches

## Source guidance

This example applies the **2. Positionals & Switches** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Positionals mapped by order; switches for flags:**
- **`switch` only for booleans; use `option` + `default` for value-togglable.**
- **`str`/owned types; define enums with `FromStr` where a constrained set fits.**

## Example

```rust
#[derive(FromArgs)]
struct Args {
    /// script to run
    #[argh(positional)]
    script: String,

    /// verbose mode
    #[argh(switch)]
    verbose: bool,
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for argh-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
