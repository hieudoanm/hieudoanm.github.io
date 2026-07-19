# Workflow notes

Focused reference for **rust-rover-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Cargo owns the build; RustRover is a view over it.** Every run configuration corresponds to a Cargo target, and it is generated from `Cargo.toml`.
- **Never hand-edit generated build state to change a target** — change `Cargo.toml` and reload. The IDE is not the source of truth for features, dependencies, or profiles.
- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).
- **Run configurations are worth committing** as `.run/*.run.xml` — plain XML, reviewable, and they give every developer the same target, arguments, and working directory.
- **`target/` and `Cargo.lock` policies differ by kind:** `target/` is always ignored; `Cargo.lock` is committed for binaries and services, and conventionally not committed for libraries. Decide and record it.
- **Feature flags are a build-time dimension, not a runtime one.** A run configuration that enables a feature the CI build does not is testing something that will not ship; keep the feature set aligned.

```toml
# rust-toolchain.toml
[toolchain]
channel = "stable"
components = ["rustfmt", "clippy", "llvm-tools"]
targets = ["x86_64-unknown-linux-gnu"]
profile = "minimal"
```

- **A workspace's members must be visible to the IDE as a Cargo workspace,** not as unrelated roots, or cross-crate navigation and refactorings break.
- **`build.rs` and proc-macro crates are the usual source of "the IDE cannot resolve"** — they are compiled by the host toolchain, and a feature/target mismatch shows up as an unresolved path in the editor only.

---

## 3. Refactoring & Inspections

- **RustRover's refactorings are worth using over text tools** for renames, extract function, and inline — the index follows modules, `mod` visibility, and re-exports, which a regex rename reliably gets wrong.
- **Rename a public item with the IDE, not with `sed`.** A `pub fn` renamed in one module but not re-exported in `lib.rs` or a `prelude` is a compile error a regex rename introduces silently.
- **Configure the inspection profile to Project and commit it.** Severity in a personal profile is invisible to the team; a convention nobody sees is not a convention.
- **The borrow-checker diagnostics come from the real compiler,** so the IDE's borrow errors match `cargo check`. Trust them the way you trust `cargo check` and not more — an IDE diagnostic on stale code can lag a second, but it will not disagree in substance.
- **Run `cargo clippy` in CI as the authority** and treat the IDE's inspections as a fast local approximation; the CLI has the full crate graph and the CI's feature set.
- **Keep the formatter as `rustfmt` from the toolchain,** configured in the IDE to match, so a reformat in the editor is a no-op relative to `cargo fmt`.

---

## 4. Debugging
