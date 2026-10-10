# Implementation notes

Focused reference for **rust-rover-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
