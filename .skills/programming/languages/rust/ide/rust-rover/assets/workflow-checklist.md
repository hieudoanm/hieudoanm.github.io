# RustRover: Workflow Checklist

A practical run sheet for applying [RustRover](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Toolchain: **RustRover is commercial, with free student, open-source, and 30-day trial licences.** No Community edition
- [ ] 1. Editions & Toolchain: **rust-toolchain.toml should be committed** and the IDE should honour it, so the editor, the debugger, and CI all use the same toolchain and target. This is the Rust equivalent of .python-version or .ruby-version, and it matters for the same reason: a construct valid in one toolchain looks broken in another
- [ ] 2. Cargo Project Model: **Cargo owns the build; RustRover is a view over it.** Every run configuration corresponds to a Cargo target, and it is generated from Cargo.toml
- [ ] 2. Cargo Project Model: **Never hand-edit generated build state to change a target** — change Cargo.toml and reload. The IDE is not the source of truth for features, dependencies, or profiles
- [ ] 3. Refactoring & Inspections: **RustRover's refactorings are worth using over text tools** for renames, extract function, and inline — the index follows modules, mod visibility, and re-exports, which a regex rename reliably gets wrong
- [ ] 3. Refactoring & Inspections: **Rename a public item with the IDE, not with sed.** A pub fn renamed in one module but not re-exported in lib.rs or a prelude is a compile error a regex rename introduces silently
- [ ] 4. Debugging: **Use the debugger's "Evaluate Expression"** for state at a meaningful frame rather than where a panic surfaced, and conditional breakpoints for the "works for me" case
- [ ] 4. Debugging: **Set a breakpoint on panic** (Run → View Breakpoints → Rust panics) to find the origin; a panic backtrace points downstream, at the first unwrap/expect that observed an already-failed invariant, not where the invariant broke
- [ ] 5. Profiling: **The bundled profiler covers CPU (sampling) and allocations,** with a call tree that links to source. It is the fastest route from "this is slow" to the function responsible
- [ ] 5. Profiling: **Keep a profiling profile separate from the debug profile.** A debug-instrumented binary's timings are not the timings you ship; profile a release build with debug info ([profile.release] debug = true) when you need both

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
