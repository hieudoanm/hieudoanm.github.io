---
name: rider-best-practices
description: Best practices for working in Rider — .slnx solutions, ReSharper's analysis engine, cross-platform .NET debugging, the AI Assistant and Junie agent, and shared conventions with Visual Studio. Use when setting up, debugging, or refactoring C#/.NET in Rider.
---

# Rider

Rider is JetBrains' cross-platform .NET IDE, built on the same ReSharper analysis engine as Visual Studio's ReSharper extension. It runs on Windows, macOS, and Linux with a consistent UI, and it is the only first-class .NET IDE on non-Windows platforms. Its main advantage over Visual Studio is **uniform behaviour across operating systems**; its main risk is **Rider-specific settings that quietly diverge from the build**. Practical Rider work is about **treating MSBuild as the build, not Rider, and committing only the settings that belong to the project**. Language rules live in [csharp.md](../csharp.md) and [dotnet.md](../dotnet.md).

_Verified against Rider 2026.2.3 (September 2026) with .NET 10 LTS. Visual Studio 2026 `18.10.2` is current stable; Visual Studio for Mac is discontinued._

---

## 1. Editions & Positioning

- **Rider is commercial, with free student, open-source, and 30-day trial licences.** There is no Community edition; the free licences are per-user and require verification.
- **Rider and Visual Studio are peers for .NET work.** Neither is deprecated, and JetBrains/Microsoft co-maintain the ReSharper engine, so analysis quality is close. Choose on platform, licence, and preference.
- **Rider adds F#, VB, C++, and Qodana support on top of C#.** Visual Studio remains the stronger choice for C++ projects and for the designer-heavy enterprise scenarios.
- **Rider ReSharper is the same engine as the ReSharper extension in Visual Studio** — a code style configured in one applies to the other via `.editorconfig` and a shared solution-level profile.
- **Rider is a 64-bit .NET process and loads a full solution index,** so a very large solution uses real memory. Measure before blaming the machine.

---

## 2. Project & Solution Model

- **Rider generates a temporary MSBuild solution from the project's `.sln`/`.slnx` and build scripts — it is a view over MSBuild, not a replacement.** If Rider and `dotnet build` disagree, the cause is a property Rider set that CI does not.
- **`.slnx` is the XML solution format and is worth preferring for new solutions:** diff-friendly, no GUID churn, and it is what JetBrains and Microsoft are both steering toward.
- **`Folder` items in a `.sln` are display-only.** They create no directory and affect no compilation. Use real project folders, or a project generator.
- **Keep `bin/`, `obj/`, and `user-files/` ignored.** Rider keeps per-user state in `user-files/` under the solution, which is local by design.
- **A project per deployable unit, not per layer.** Splitting `Api`/`Core`/`Infrastructure` compiles three assemblies to ship one, and it slows every build until independent versioning is actually needed.
- **Commit `global.json` to pin the SDK** and a `Directory.Build.props` for shared properties, so Rider and CI resolve the same toolchain and the same language version.

```text
global.json                    # SDK pin
Directory.Build.props          # Nullable, LangVersion, TreatWarningsAsErrors
Directory.Packages.props       # central package management
MyApp.slnx
src/MyApp.Api/
src/MyApp.Core/
tests/MyApp.Tests/
```

- **Rider's own generated artefacts live in `obj/` and the temp solution directory** and are cleaned by deleting them; there is no separate "Rider cache" to purge in a repo.
- **If Rider cannot restore, delete `obj/` and re-restore** before escalating. Stale NuGet assets and a corrupt restore cache are the usual cause.

---

## 3. Inspection & Refactoring

- **ReSharper's inspections are the reason to use Rider** — deeper semantic analysis than the compiler, including nullability flow, LINQ, and async correctness.
- **Set the inspection profile to "Project" (not "Solution")** so it lives in `.idea/` and is shared, and adjust severity there. The "Solution" profile is a local choice that silently overrides the project one.
- **Share conventions through `.editorconfig`** for anything format-related; use the inspection profile for analysis severity. They solve different problems and mixing them makes the source unreadable.
- **Use Rider's refactorings for semantic changes** — extract, introduce parameter, change signature, convert to async, and the migration refactorings. They are backed by the same index that powers inspection, so they are safe across a large codebase.
- **Run Inspect Code → Solution-wide analysis before a large refactor,** to establish the baseline. Afterwards, to catch what you introduced.
- **Turn off inspections you deliberately disagree with at the project level,** rather than suppressing the diagnostic at every call site.
- **The "Suggestion" severity is where most noise lives.** Raising a suggestion to a warning that the build enforces is a real convention; leaving it as a suggestion is a wish.

---

## 4. Debugging & Profiling

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

---

## General Rules of Thumb

- Rider is a view over MSBuild: when Rider and CI disagree, CI is right.
- Prefer `.slnx`; commit `global.json`, `Directory.Build.props`, and `Directory.Packages.props`.
- Ignore `.idea/` except `run/`, `codeStyles/`, `inspectionProfiles/`.
- Use the project-scoped inspection profile plus `.editorconfig`; never rely on personal settings.
- Exception breakpoints on throw, not catch; dotTrace for hot paths, dotMemory for growth.
- Commit `.run/*.run.xml` so the debugger setup is shared.
- Review agentic (Junie) changes with the same rigour as your own.
- Keep one AI completion source active per project.

---

## Quick-Start Checklist

- [ ] `global.json` pins the SDK; `Directory.Build.props` sets `Nullable` and `LangVersion`
- [ ] Solution opened from `.slnx` where possible
- [ ] `.idea/` ignored, with `run/`, `codeStyles/`, `inspectionProfiles/` re-included
- [ ] Inspection profile set to Project, not Solution
- [ ] `.editorconfig` carries formatting; the inspection profile carries analysis severity
- [ ] DotNetCliToolPath / SDK resolution verified against CI
- [ ] Debug configuration verified to build Debug; a release-optimised profile used for profiling
- [ ] Exception breakpoints configured on throw for the languages in use
- [ ] dotTrace run on at least one real workload to confirm profiling works
- [ ] dotMemory leak-check configured if the app is long-lived
- [ ] AI Assistant or Copilot enabled — not both
- [ ] Agentic changes reviewed diff-first, with tests run before commit
