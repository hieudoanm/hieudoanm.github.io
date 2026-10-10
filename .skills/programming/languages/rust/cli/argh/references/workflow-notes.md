# Workflow notes

Focused reference for **argh-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Positionals mapped by order; switches for flags:**

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

- **`switch` only for booleans; use `option` + `default` for value-togglable.**
- **`str`/owned types; define enums with `FromStr` where a constrained set fits.**

---

## 3. Subcommands

- **A generated enum through `#[argh(subcommand)]`:**

```rust
#[derive(FromArgs)]
struct Args {
    #[argh(subcommand)]
    cmd: Cmd,
}

#[derive(FromArgs)]
#[argh(subcommand)]
enum Cmd {
    Add(AddArgs),
    List(ListArgs),
}
```

- **Subcommand variant structs carry their own `FromArgs`-derived fields + docs.**
- **Help per subcommand is automatic; `description` attributes word the top-level synopsis.**

---
