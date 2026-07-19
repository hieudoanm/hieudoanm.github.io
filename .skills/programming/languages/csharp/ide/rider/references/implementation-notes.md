# Implementation notes

Focused reference for **rider-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **The debugger reads real PDBs and can attach to a running .NET process,** including a child process, which is what you need for anything with a queue or a spawned worker.
- **Use the debugger's exception breakpoint on throw,** not on catch — the throw site is the diagnosis; the caught frame is a symptom.
- **The Profiler's CPU tracing (dotTrace) attributes cost to Rider's index,** so the flame chart is readable without leaving the IDE. Use it before reaching for `dotnet-trace` or PerfView.
- **Memory profiling with dotMemory finds leaks that manifest as growth,** which unit tests and a debugger session will not show. Snapshot on demand rather than only at exit, or the allocation site is already gone.
- **Keep profiling and debugging configurations separate** — a release-optimised build measures the program you ship, not a debug-instrumented one.
- **Run configurations can be committed** as `.run/*.run.xml`, giving every developer the same target, arguments, and working directory.

---

## 5. Refactoring & AI

- **The AI Assistant provides completion, chat, and generation; Junie is the agentic counterpart** that plans and applies multi-file changes. Both are integrated into the IDE and the difference matters: Assistant answers, Junie acts.
- **Treat agent-produced changes like any other change:** review the diff, require tests, and never accept a whole-file rewrite you have not read. The main failure mode is a plausible-looking edit that drops an edge case.
- **Pin behaviour in `.editorconfig` and the project inspection profile so the AI inherits your standards** rather than the default JetBrains ones.
- **GitHub Copilot and the JetBrains AI Assistant are both available**; having two completion sources active produces conflicting suggestions. Pick one per project.

---

## 6. JetBrains Shared Conventions

These apply across the JetBrains family (CLion, Rider, WebStorm, PyCharm, and the rest) and are worth stating once:

- **`.idea/` is mostly user state and should be ignored** except the shareable subset: `codeStyles/`, `inspectionProfiles/`, and `.run/`. The gitignore needs `!.idea/run/` style re-includes, since git will not re-include files under an ignored directory.
- **A directory marked "Excluded" is invisible to every inspection, refactoring, and search in the project** — a frequent cause of "the IDE is wrong" reports.
- **`Settings` has a `This computer` vs `Project` scope toggle.** Anything set to `This computer` is your machine's opinion; anything that belongs to the team belongs to the project.
- **The Toolbox App manages installs and updates.** It also keeps a second copy of a plugin's engine, which occasionally differs from the bundled one — check Settings → Plugins for the source of any engine that behaves unexpectedly.
- **Prettier/format-on-save via a plugin is not a substitute for the tool in the repo.** The repo's `pnpm format` is what CI runs; make the IDE produce the same output or accept the diff churn.
