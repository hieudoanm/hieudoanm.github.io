# Overview

Focused reference for **rust-rover-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# RustRover

RustRover is JetBrains' Rust IDE, built on the same platform as Rider and CLion: a real debugger, a memory and CPU profiler, refactorings backed by a semantic index, and the Cargo-aware project model JetBrains IDEs are good at. Its distinguishing feature against a `rust-analyzer`-only setup is **a debugger and profiler that require no separate toolchain setup**. Practical RustRover work is about **letting Cargo and `rust-toolchain.toml` own the build, and using the IDE's index for the refactorings it is better at than text tools**. Language rules live in rust.md.

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
