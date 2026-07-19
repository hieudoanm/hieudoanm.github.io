# Implementation notes

Focused reference for **argh-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Errors & Exit Codes

- **`argh::from_env()` panics on parse failure with argh's exit — acceptable for lean CLIs:**

```rust
match Args::from_args(&["cli"], &env::args_os().collect::<Vec<_>>()) {
    Ok(args) => run(args),
    Err(err) => { eprintln!("{err}"); std::process::exit(1); }
}
```

- **Graceful exits: map parse errors to stderr + status; keep program errors separate.**
- **Test parsing via `FromArgs::from_args` against fixture arg slices.**

---

## 5. Testing & Docs

- **Unit-test the parse layer — fixed arg vectors:**

```rust
#[test]
fn parses_passes() {
    let args = Args::from_args(&["cli"], &["--input", "x", "--passes", "4"]);
    assert_eq!(args.passes, 4);
}
```

- **Doc comments are the help — review `--help` output as a contract.**
- **Keep CLI surface small: opt-outs become subcommands, not flags all.**
