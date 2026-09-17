# Workflow notes

Focused reference for **clion-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
