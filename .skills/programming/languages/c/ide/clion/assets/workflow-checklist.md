# CLion: Workflow Checklist

A practical run sheet for applying [CLion](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Toolchain: **CLion is commercial with a free 30-day trial and a free non-commercial licence.** Student and open-source licences are separate and free; neither is a Community edition, because no such edition exists
- [ ] 1. Editions & Toolchain: **The bundled LLVM toolchain (Clang + LLDB + lldb-server) is the recommended default** for C and C++. It ships matching compiler, debugger, and sanitiser versions, so an address or thread bug reproduces under the same toolchain that reports it
- [ ] 2. CMake Project Model: **CLion reads your CMakeLists.txt — it does not own the build.** Every "Run/Debug Configuration" is a generated target, and renaming a target in the IDE is not possible because the IDE is not the source
- [ ] 2. CMake Project Model: **Never edit the generated .idea/ build files to change the build.** They are regenerated on reload; a change is silently lost. Change CMakeLists.txt and reload the project
- [ ] 3. Code Insight: **CLion's completion is driven by the real compile database**, so a missing include is the usual cause of a silently wrong suggestion. Fix the include rather than the IDE
- [ ] 3. Code Insight: **clangd can be selected as the engine** (Settings → Languages & Frameworks → C/C++ → clangd). It matches command-line tooling exactly, at the cost of some JetBrains-specific inspections
- [ ] 4. Debugging: **Run under the debugger even when you only want a stack trace** — a release-mode backtrace is often all the information a crash has, and building with debug info costs almost nothing
- [ ] 4. Debugging: **Set a breakpoint on an exception, not just a line.** Run → View Breakpoints → Exception Breakpoints with throw enabled finds the throw site, which is where the diagnosis actually happens; the crash point is downstream
- [ ] 5. Sanitisers & Profiling: **AddressSanitizer and UndefinedBehaviorSanitizer are the first tool, not the last.** Add them to a debug preset: -fsanitize=address,undefined -fno-omit-frame-pointer -g
- [ ] 5. Sanitisers & Profiling: **Keep sanitised and profiling builds separate** — a sanitised binary is 2–20x slower and its timings are meaningless

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
