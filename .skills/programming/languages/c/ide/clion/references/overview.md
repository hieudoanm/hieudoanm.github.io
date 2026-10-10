# Overview

Focused reference for **clion-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# CLion

CLion is JetBrains' cross-platform C/C++ IDE: a CMake-native build model, a debugger built around LLVM, bundled code insight for the standard library, and a performance profiler in the same window. Its main source of friction is that **its project model is a generated artefact, and CI never reads it**. Practical CLion work is about **treating `compile_commands.json` as the single source of truth, keeping the IDE out of the build, and using the bundled toolchain consistently so debugging reflects reality**. Language rules live in c.md and cpp.md.

_Verified against CLion 2026.2.3 (September 2026) with the bundled LLVM toolchain (Clang 21). C/C++ standards follow the compiler you point it at, not an IDE setting._

---

## 1. Editions & Toolchain

- **CLion is commercial with a free 30-day trial and a free non-commercial licence.** Student and open-source licences are separate and free; neither is a Community edition, because no such edition exists.
- **The bundled LLVM toolchain (Clang + LLDB + lldb-server) is the recommended default** for C and C++. It ships matching compiler, debugger, and sanitiser versions, so an address or thread bug reproduces under the same toolchain that reports it.
- **A toolchain entry maps a CMake executable to a debugger.** You can add GCC + GDB as a second toolchain and switch per-profile when you must reproduce a GCC-only issue.
- **`MinGW` is not a debugger, it is a compiler.** Pairing MinGW with a GDB from a different toolchain produces path-format mismatches (`/c/...` vs `C:\...`); use the bundled toolchain or a matched pair.
- **On Windows, MSVC support is first-class** through the Visual Studio toolchain; the bundled Clang is easier but not what your CI uses.
- **The IDE version is not the compiler version.** A toolchain can be repointed at a different compiler without the IDE changing.

---

## 2. CMake Project Model

- **CLion reads your CMakeLists.txt — it does not own the build.** Every "Run/Debug Configuration" is a generated target, and renaming a target in the IDE is not possible because the IDE is not the source.
- **Never edit the generated `.idea/` build files to change the build.** They are regenerated on reload; a change is silently lost. Change `CMakeLists.txt` and reload the project.
- **`.idea/` holds IDE state, not build state — keep it out of version control** except the small shareable subset (`codeStyles/`, `inspectionProfiles/`, and the `.run/` run configurations). `cmakeLists/` inside `.idea/` is generated.
- **Run configurations are worth committing.** `.run/*.run.xml` is plain XML, reviewable, and gives every developer the same debugger target and working directory.
- **Prefer a `CMakePresets.json` to IDE profiles** for anything that is not a debugging convenience. CLion reads presets, and so does CI, so one file serves both.
- **A `CMakeLists.txt` with absolute paths or developer-specific options will break for everyone else.** Guard debug-only flags behind a cache variable.
