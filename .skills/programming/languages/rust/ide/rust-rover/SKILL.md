---
name: "rust-rover-best-practices"
description: "Best practices for working in RustRover — Cargo as the project model, rustup toolchain selection, borrow-checker-aware inspections, the debugger and profiling, and JetBrains shared conventions. Use when setting up, debugging, or refactoring a Rust project in RustRover."
tags:
  - "programming"
  - "language"
  - "rust"
  - "ide"
  - "rover"
when_to_use: "Use when setting up, debugging, or refactoring a Rust project in RustRover."
prerequisites:
  - "Basic familiarity with Rust and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../c/ide/clion/SKILL.md"
  - "../../../java/ide/idea/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# RustRover

RustRover is JetBrains' Rust IDE, built on the same platform as Rider and CLion: a real debugger, a memory and CPU profiler, refactorings backed by a semantic index, and the Cargo-aware project model JetBrains IDEs are good at. Its distinguishing feature against a `rust-analyzer`-only setup is **a debugger and profiler that require no separate toolchain setup**. Practical RustRover work is about **letting Cargo and `rust-toolchain.toml` own the build, and using the IDE's index for the refactorings it is better at than text tools**. Language rules live in [rust.md](../../SKILL.md).

_Verified against RustRover 2026.2.3 (September 2026) with Rust 1.9x stable via rustup, Cargo, and the bundled LLDB-based debugger. MSVC toolchain on Windows, `llvm-tools` component for profiling._

---

## 1. Editions & Toolchain

- **RustRover is commercial, with free student, open-source, and 30-day trial licences.** No Community edition.
- **`rust-toolchain.toml` should be committed** and the IDE should honour it, so the editor, the debugger, and CI all use the same toolchain and target. This is the Rust equivalent of `.python-version` or `.ruby-version`, and it matters for the same reason: a construct valid in one toolchain looks broken in another.
- **The IDE's bundled LLDB-based debugger is the default** and works with the `llvm-tools` component installed. For MSVC targets, use the MSVC toolchain rather than GNU; a GNU/MSVC mismatch produces path and ABI errors that look like language bugs.
- **Debugging release-optimised code** works but is much less pleasant; keep a debug profile for stepping and a release profile for timing.
- **The IDE version is not the toolchain version.** The toolchain comes from rustup, and can be repointed without changing the IDE.

---

## 2. Cargo Project Model

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

- **Use the debugger's "Evaluate Expression"** for state at a meaningful frame rather than where a panic surfaced, and conditional breakpoints for the "works for me" case.
- **Set a breakpoint on panic** (Run → View Breakpoints → Rust panics) to find the origin; a panic backtrace points downstream, at the first `unwrap`/`expect` that observed an already-failed invariant, not where the invariant broke.
- **`dbg!` is a debugger substitute for a quick look, not a logging tool.** It is a macro that stays in the source; anything you keep should be a real `log`/`tracing` call.
- **Attach to a running process for anything service-shaped.** A debugger-launched binary is not the one under real load or real concurrency.
- **The debugger handles threads and async runtimes** (Tokio tasks show as separate stack views), which is the main reason to use it over `println!` for concurrent code.
- **A core dump is a debugging tool:** enable with `ulimit -c unlimited` before the run, and open it post-mortem in the IDE. Reproducing a rare race is often harder than reading the dump.

---

## 5. Profiling

- **The bundled profiler covers CPU (sampling) and allocations,** with a call tree that links to source. It is the fastest route from "this is slow" to the function responsible.
- **Keep a profiling profile separate from the debug profile.** A debug-instrumented binary's timings are not the timings you ship; profile a release build with debug info (`[profile.release] debug = true`) when you need both.
- **`cargo-flamegraph` or `samply` are better for an already-running production process** than attaching a debug build, for the same reason as everywhere else: a debug-instrumented process changes what you are measuring.
- **Compare relative costs, not absolute numbers,** whenever instrumentation overhead is present.
- **Allocation profiling finds memory growth that a CPU profile will not** — for a leak, snapshot over time rather than only at exit, or the allocating site is already gone.

---

## 6. Cargo Features & Dependencies

- **Add dependencies through the Cargo.toml, not the IDE's "add dependency" convenience,** and commit the resulting `Cargo.lock` for a binary. An IDE-installed crate that never reaches the `Cargo.toml` is a build that only works on your machine.
- **Keep `features` aligned between the IDE's run configuration, `cargo check`, and CI.** A feature that is only enabled in the editor is a code path you are not testing.
- **`optional` and `default` features change the dependency graph,** so a missing symbol that only appears in one environment is a feature difference; check `cargo tree -e features` before hunting a phantom bug.
- **Proc-macro and build-script crates compile for the host,** not the target, which is a common source of "why does this work locally but not in the Docker build".

---

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
