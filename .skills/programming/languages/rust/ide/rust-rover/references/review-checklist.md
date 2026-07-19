# Review checklist

Focused reference for **rust-rover-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. JetBrains Shared Conventions

- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore`.
- **An excluded directory is invisible to every inspection, refactoring, and search.**
- **Settings are `This computer` or project-scoped**; anything shared belongs in a committed config file (`rust-toolchain.toml`, `.rustfmt.toml`, the inspection profile).
- **The Toolbox App manages installs and plugin engines**; two engines for the same plugin explain occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- `rust-toolchain.toml` committed and honoured; the IDE, debugger, and CI share the toolchain and target.
- Cargo owns the build; never hand-edit generated build state.
- Refactor with the IDE (rename, extract, inline) — the index follows modules and re-exports that a regex rename breaks.
- `cargo clippy` and `cargo fmt` in CI are the authority; the IDE is the fast local view.
- Break on panic, not on the `unwrap` that observed a broken invariant; attach to a running process for services.
- Profile a release build with debug info, in a profile separate from debug; compare relative costs.
- Keep feature flags aligned across the IDE run config, `cargo check`, and CI.

---

## Quick-Start Checklist

- [ ] `rust-toolchain.toml` committed with channel, components, and targets
- [ ] `llvm-tools` component installed for profiling
- [ ] MSVC (not GNU) toolchain on Windows; debugger pairing verified
- [ ] Dependencies added via `Cargo.toml`, `Cargo.lock` committed for a binary
- [ ] `target/` ignored; `Cargo.lock` policy decided and documented
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] Run configurations committed as `.run/*.run.xml`
- [ ] Inspection profile set to Project and committed
- [ ] Formatter matched to `rustfmt`/`rustfmt.toml` from the toolchain
- [ ] Panic breakpoints configured
- [ ] Profiling profile separate from debug, with `debug = true` on release
- [ ] `cargo clippy` and `cargo test` green in CI, not only in the IDE
- [ ] Feature flags aligned across the IDE run config, `cargo check`, and CI
