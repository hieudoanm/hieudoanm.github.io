# Review checklist

Focused reference for **clion-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## General Rules of Thumb

- `CMakeLists.txt` is the build; `.idea/` is not. Never hand-edit generated build state.
- Use the bundled LLVM toolchain; add a second toolchain for GCC-only reproduction.
- Commit `CMakePresets.json`, `.run/`, `inspectionProfiles/`, and `.editorconfig`; ignore the rest of `.idea/`.
- Sanitisers before debugging sessions, profiler for "why is this slow", both in a dedicated preset.
- Exception breakpoints and conditional breakpoints before logging statements.
- Check the active build profile before believing that a bug is real.
- Prefer clangd when your CI already uses it, so diagnostics match.

---

## Quick-Start Checklist

- [ ] `CMake_EXPORT_COMPILE_COMMANDS ON` in the top-level `CMakeLists.txt`
- [ ] `CMAKE_CXX_STANDARD` set explicitly, not left to the compiler default
- [ ] `CMakePresets.json` committed; CI and IDE both consume it
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] Toolchain selected explicitly; GDB/LLDB matched to the compiler
- [ ] Warnings-as-errors behind a cache option for CI
- [ ] Sanitiser and profile presets defined separately from the debug build
- [ ] Exception breakpoints configured for the throw site
- [ ] Formatter set to the same `clang-format` binary CI uses
- [ ] Generated headers and build output excluded from indexing
- [ ] Tests runnable from the IDE (CTest integration verified)
- [ ] Run configurations attached to a `CTest`/test target, not just the binary
