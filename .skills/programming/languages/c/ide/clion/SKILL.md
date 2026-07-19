---
name: "clion-best-practices"
description: "Best practices for working in CLion — CMake project models, compile_commands.json as the source of truth, the bundled LLVM toolchain, debugging and profiling workflows, and JetBrains shared conventions. Use when setting up, debugging, or profiling a C/C++ project in CLion."
tags:
  - "programming"
  - "language"
  - "c"
  - "ide"
  - "clion"
when_to_use: "Use when setting up, debugging, or profiling a C/C++ project in CLion."
prerequisites:
  - "Basic familiarity with C and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../php/ide/php-storm/SKILL.md"
  - "../../../rust/ide/rust-rover/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# CLion

CLion is JetBrains' cross-platform C/C++ IDE: a CMake-native build model, a debugger built around LLVM, bundled code insight for the standard library, and a performance profiler in the same window. Its main source of friction is that **its project model is a generated artefact, and CI never reads it**. Practical CLion work is about **treating `compile_commands.json` as the single source of truth, keeping the IDE out of the build, and using the bundled toolchain consistently so debugging reflects reality**. Language rules live in [c.md](../../SKILL.md) and [cpp.md](../../cpp/SKILL.md).

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

```cmake
cmake_minimum_required(VERSION 3.24)
project(app LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

option(APP_WERROR "Treat warnings as errors" OFF)
if(APP_WERROR)
  add_compile_options(-Wall -Wextra -Wpedantic -Werror)
endif()

add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE fmt::fmt)

include(CTest)
add_test(NAME smoke COMMAND app --self-test)
```

- **`CMAKE_EXPORT_COMPILE_COMMANDS ON` matters even if you never use clangd**, because it is the interface any external tool reads.
- **A header-only change should not trigger a full relink storm.** If it does, you have a target boundary in the wrong place; re-check which sources are listed per target.

---

## 3. Code Insight

- **CLion's completion is driven by the real compile database**, so a missing include is the usual cause of a silently wrong suggestion. Fix the include rather than the IDE.
- **`clangd` can be selected as the engine** (Settings → Languages & Frameworks → C/C++ → clangd). It matches command-line tooling exactly, at the cost of some JetBrains-specific inspections.
- **Inspection profiles are the intended way to share standards.** `Settings → Inspections → Profile` exports to `inspectionProfiles/Project.xml`; commit that file instead of describing conventions in a wiki.
- **Turn a specific inspection into an error via `.editorconfig` or the profile,** not by telling the team to watch for it. An inspection nobody can see is not a convention.
- **The built-in formatter is ClangFormat integration,** and the same `clang-format` binary your CI uses should be the one selected (Settings → Editor → Code Style → C/C++ → ClangFormat).

---

## 4. Debugging

- **Run under the debugger even when you only want a stack trace** — a release-mode backtrace is often all the information a crash has, and building with debug info costs almost nothing.
- **Set a breakpoint on an exception, not just a line.** Run → View Breakpoints → Exception Breakpoints with `throw` enabled finds the throw site, which is where the diagnosis actually happens; the crash point is downstream.
- **Use conditional breakpoints for the "works in my head" case:** right-click a breakpoint → Condition. `i == 42` avoids a thousand useless hits.
- **Watches and the memory view beat printf for state.** A struct rendered as fields is more legible than formatted text, and there is no format-string bug to debug alongside the real bug.
- **Attach to a running process for anything service-shaped** (Run → Attach to Process), including remote and Docker targets. The alternative — a debugger-only build — changes the timing you are trying to observe.
- **Debug in Docker or WSL with a matching toolchain path.** A debugger that cannot map paths across the boundary shows source lines you cannot verify.
- **Core dumps are a debugging tool:** `ulimit -c unlimited` before the run. Post-mortem analysis in CLion is often faster than reproducing.

---

## 5. Sanitisers & Profiling

- **AddressSanitizer and UndefinedBehaviorSanitizer are the first tool, not the last.** Add them to a debug preset: `-fsanitize=address,undefined -fno-omit-frame-pointer -g`.
- **Keep sanitised and profiling builds separate** — a sanitised binary is 2–20x slower and its timings are meaningless.
- **CLion's bundled profiler covers CPU, allocations, and memory.** A flame chart is the fastest way to find a hot path, and the call tree under it is more useful than `perf` output because it links straight to the source.
- **`-O2 -g` for profiling work.** Optimising away the code you are measuring produces a profile of a program you do not ship.
- **Sanitiser reports are not approximate.** An ASan finding is a real memory error, often one that would corrupt state far from the reported site.
- **`Debug` vs `Release` confusion is the most common false bug report.** Check the active profile in the build output before investigating the code.

---

## 6. Version Control & Team Work

- **Commit `.run/`, `inspectionProfiles/`, and `.editorconfig`; ignore the rest of `.idea/`.** A shared-code-style file settles a class of diff noise permanently.
- **Use a `.gitignore` that excludes `.idea/` wholesale, then re-include the three shared paths** — the ordering matters, since git does not re-include files under an ignored directory without it.
- **JetBrains client-side code review (`Code → Code Review`) gives a shared comment vocabulary** and threads resolved inline, which plain PR comments do not.
- **Commit the `CMakePresets.json` before the IDE run configurations** when the two disagree; the presets are the portable part.

```gitignore
.idea/
!.idea/run/
!.idea/codeStyles/
!.idea/inspectionProfiles/
cmake-build-*/
compile_commands.json
```

---

## 7. Performance & Refactoring

- **CLion's refactorings are reliable for semantic changes** — extract function, introduce parameter, change signature — because they are backed by the real index. Use them rather than hand-editing signatures across a codebase.
- **The ReSharper C++ engine does most of the work,** so keeping the project fully indexed matters more than in other JetBrains IDEs. Excluding a generated directory with a full-project search will slow it noticeably; exclude narrow paths only.
- **Run inspections as a batch (Inspect Code → Whole solution) before large refactors,** not after, so the baseline is known.
- **Memory: check the size of what you assume is small.** `sizeof` in a watch, or a static assert, replaces a guess.
- **For large codebases, build only the target you are changing.** Building everything because there is one run configuration defeats the incremental build the IDE was designed around.

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
