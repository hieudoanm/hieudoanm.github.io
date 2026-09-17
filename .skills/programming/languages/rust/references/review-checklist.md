# Review checklist

Focused reference for **rust-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```rust
Server::builder()
    .addr("0.0.0.0:8080")
    .timeout(Duration::from_secs(30))
    .build()?
```

- **`From`/`TryFrom`** over ad-hoc `fn from_x(...) -> Self` constructors — integrates with `?` and generic code expecting standard conversions.
- **Keep public API surface minimal** — `pub(crate)` for anything only used internally across modules, private by default, only widen visibility when a real external caller needs it.
- **Document public items** with `///` doc comments including a runnable example where feasible — `cargo test` runs doc examples automatically, so they stay correct.

---

## 8. General Rules of Thumb

- **Work with the borrow checker, not around it.** If you're fighting it constantly, the data ownership design usually needs rethinking, not more `clone()`/`unsafe`.
- **`unsafe` is a deliberate, documented exception**, not a shortcut — every `unsafe` block should have a comment explaining the invariant that makes it sound.
- **Avoid premature `Arc<Mutex<T>>` for concurrency** — reach for it when you actually have shared mutable state across threads, not as a default pattern for anything that might one day be concurrent.
- **Small, focused crates over one monolithic module** in larger projects — compile times and clarity both benefit.

---

## Quick-Start Checklist

- [ ] Function signatures borrow (`&str`, `&[T]`) rather than own, unless ownership is genuinely needed
- [ ] `thiserror` for library error types, `anyhow` for application-level propagation
- [ ] No unexplained `unwrap()`/`expect()` on I/O or external input
- [ ] `#[derive(...)]` used instead of hand-written trait impls where behavior matches
- [ ] Unit tests co-located in `#[cfg(test)] mod tests`, integration tests in `tests/`
- [ ] `cargo fmt` + `cargo clippy` (deny warnings) running in CI
- [ ] `cargo audit` checked for dependency vulnerabilities
- [ ] Public API surface kept minimal (`pub(crate)` used deliberately)
- [ ] Every `unsafe` block has a comment justifying its safety invariant
