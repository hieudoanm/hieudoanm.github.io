# Workflow notes

Focused reference for **rust-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Error Handling

- **Libraries: `thiserror`** for a typed, structured error enum callers can match on:

```rust
#[derive(thiserror::Error, Debug)]
pub enum ConfigError {
    #[error("config file not found at {0}")]
    NotFound(PathBuf),
    #[error("failed to parse config: {0}")]
    ParseError(#[from] toml::de::Error),
}
```

- **Binaries/applications: `anyhow`** for ergonomic propagation when callers don't need to match on error variants, just report them:

```rust
fn load_config(path: &Path) -> anyhow::Result<Config> {
    let contents = std::fs::read_to_string(path)
        .with_context(|| format!("reading config at {}", path.display()))?;
    toml::from_str(&contents).context("parsing config")
}
```

- **`unwrap()`/`expect()` are for genuine invariants only** (a `Mutex` that can't actually be poisoned in your design, a regex compiled from a string literal you control) — never on I/O, parsing, or anything driven by external input. Use `expect("message explaining why this can't fail")` over bare `unwrap()` so a future panic is diagnosable.
- **`?` operator everywhere else** — don't manually `match` and re-wrap when `?` (plus `From`/`#[from]` conversions) does it cleanly.

---

## 4. Traits & Generics

- **Prefer trait objects (`dyn Trait`) for heterogeneous collections or plugin-style extensibility; generics (`impl Trait` / `<T: Trait>`) for performance-sensitive monomorphized code.** Default to generics unless you specifically need dynamic dispatch or to store different types in one collection.
- **`impl Trait` in argument position** (`fn process(items: impl Iterator<Item = i32>)`) for simple cases; named generic parameters when you need to reference the type elsewhere in the signature or bound multiple parameters together.
- **Derive over hand-writing:** `#[derive(Debug, Clone, PartialEq)]` etc. — only hand-implement a trait when the derived behavior is actually wrong for your type.
- **Newtype pattern** (`struct UserId(u64);`) over raw primitives for domain concepts — catches mixing up IDs at compile time for free.

---
