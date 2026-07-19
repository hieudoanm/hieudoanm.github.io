---
name: visual-studio-best-practices
description: Best practices for working in Visual Studio 2026 — solution structure, .slnx, MSBuild configuration, Roslyn analyzers, Hot Reload, the built-in test runner, and dotnet CLI parity. Use when setting up or debugging a C#/.NET project in Visual Studio or Rider.
---

# Visual Studio

Visual Studio is the full-featured Windows IDE: Roslyn compilation and IntelliSense, the designer, a real debugger with Hot Reload, profilers, and a test runner. It is also the heaviest tool in the .NET ecosystem, and its main source of friction is that **it stores configuration in places CI never reads**. Practical Visual Studio work is about **keeping settings in project files, treating the IDE as a view over MSBuild, and not letting a solution-only setting become a production difference**. Language rules live in [csharp.md](../csharp.md) and [dotnet.md](../dotnet.md).

_Verified against Visual Studio 2026 `18.10.2` (September 2026, build 12217.157) with .NET 10 LTS. Rider 2026.3 is current in EAP. The Mac edition was discontinued — Rider is the cross-platform option._

---

## 1. Editions & Channels

- **VS 2026 versions as 18.x** — `18.10.2` is current stable. Enterprise, Professional, and Community share the 18.x line; features are gated by licence, and Community's cap is a revenue/headcount threshold rather than a feature tier.
- **Two free alternatives are legitimate**: Community for individual/small-team work, and **Rider** for a genuinely better cross-platform experience. Neither is a compromise for most projects.
- **Visual Studio for Mac is discontinued.** Do not plan around it; use Rider on macOS and Linux.
- **Preview/Insiders is a separate install, not an in-place upgrade.** Keep it isolated if you use it, and never ship a release built with it.
- **The IDE version is not the SDK version.** VS can target several .NET SDKs at once; the SDK comes from a `global.json`. Check which SDK is actually resolving.

---

## 2. Solution Structure

- **A `.sln` is a container with build-configuration state inside it.** Prefer `.slnx` (the XML solution format) for new solutions: it is diff-friendly, generated-file friendly, and Microsoft is steering toward it.
- **`Folder` items in a `.sln` are display-only** and do not create a directory or affect compilation. Use actual project folders or, better, a project generator.
- **A project per deployable unit, not per layer.** Separate `Api`, `Core`, and `Infrastructure` projects compile separately and slow every build; one project with folders is faster until you actually need independent versioning.
- **Prefer a project generator** (`dotnet new`, `Microsoft.DotNet.sdk` templates, or Nuke/Janus) for anything with more than a handful of projects. The `.sln` is output.
- **Keep `bin/` and `obj/` ignored**, and `.vs/` ignored too — it holds per-user state and should never be committed.
- **Commit `global.json` to pin the SDK**, so CI and every developer resolve the same toolchain.

```text
global.json
Directory.Build.props      # one place for LangVersion, Nullable, TreatWarningsAsErrors
Directory.Packages.props   # central package management (CPM)
src/MyApp.Api/
src/MyApp.Core/
tests/MyApp.Tests/
```

- **Central Package Management is worth it past a few packages.** `Directory.Packages.props` makes version drift across a solution impossible instead of merely unlikely.

---

## 3. Build Configuration

- **The IDE is a view over MSBuild.** If `dotnet build` and the IDE disagree, the cause is almost always a property the IDE set but CI does not — environment variables, user-level `.props`, or a machine-wide import.
- **Put shared properties in `Directory.Build.props`**, not by editing each `.csproj`. `Directory.Build.targets` for targets. They are discovered by walking up from the project directory.
- **Treat `TreatWarningsAsErrors` as CI-only if it is noisy locally**, via a condition on `Configuration` or `$(ContinuousIntegrationBuild)`.
- **`ContinuousIntegrationBuild=true` in CI** is what enables deterministic output and the path-mapping that makes stack traces readable.
- **Pin the SDK with `global.json`,** and pin workloads explicitly with a `rollForward` policy.
- **Understand what you are building: Any CPU, x86, x64, or ARM64.** A published portable app defaults to `AnyCPU`, which will not run on a machine without the matching runtime; an explicit `RuntimeIdentifier` makes that a build-time decision.
- **Never rely on the IDE's "startup project" outside the IDE.** It is a `.sln` setting and means nothing to `dotnet test`.

```xml
<!-- Directory.Build.props -->
<Project>
  <PropertyGroup>
    <Nullable>enable</Nullable>
    <LangVersion>latest</LangVersion>
    <TreatWarningsAsErrors Condition="'$(CI)' == 'true'">true</TreatWarningsAsErrors>
    <ContinuousIntegrationBuild Condition="'$(CI)' == 'true'">true</ContinuousIntegrationBuild>
  </PropertyGroup>
</Project>
```

- **`<ImplicitUsings>enable</ImplicitUsings>`** removes a wall of `using` lines, but know what it imported before assuming a type is in scope.

---

## 4. Startup & Performance

- **Startup cost is dominated by solution size and analyzer work**, not the IDE itself. A solution that takes minutes to load is a solution with too many projects or too many analyzers.
- **Disable unused workload components and extensions** at install time. Every installed component is loaded whether or not you use it.
- **`EnableNETAnalyzers` defaults on for modern SDKs.** Tune the rule set with an `.editorconfig` rather than suppressing warnings one at a time in the UI.
- **Turn off "Restore on build" and background IntelliSense if they are fighting you**, but understand that you are trading correctness for speed.
- **Solution filters (`.slnf`) are the right answer for large solutions** — they load a subset without restructuring the solution.
- **If a build is slow, measure before tuning.** `dotnet build -bl` produces a binary log readable by MSBuild's structured log viewer, and it will name the actual bottleneck.

---

## 5. Debugging

- **Hot Reload (Edit and Continue) is the feature to rely on for iteration.** It patches running managed code without a restart — but only for changes it can apply. Changing a method signature, adding a field, or editing a `static` constructor forces a restart.
- **Turn on Hot Reload explicitly for .NET 6+ projects** if it is not offered; it is not always enabled for every project type, and it does not work for native or unsafe-heavy code.
- **The exception helper breaks on thrown exceptions that are handled.** Useful while diagnosing, noise in normal operation — scope it to specific exception types or turn it off once fixed.
- **Native + managed debugging requires the right components** and a matching toolchain; getting C++/CLI or P/Invoke interop to give you accurate frames takes configuration.
- **Debugger displays matter.** "Just My Code" and "Show just My Code" filter frames; for a crash inside a dependency you will want both off.
- **Snapshot debugging** (`.snapshot` files from a production dump) is worth the setup if you support a deployed service — the alternative is guessing from logs.
- **Attach rather than launch when reproducing an environment problem.** Attaching to a running process tells you what it is actually doing, not what you assumed when you started it.

---

## 6. Refactoring & Analysis

- **Roslyn analyzers run at compile time, in every build** — including CI. The IDE is not the only place they fire, which makes them the right home for a correctness rule.
- **Configure analyzer severity in `.editorconfig`,** not in the IDE's Error List settings, so the rules travel with the repo.
- **Rename via the CodeLens/refactor menu, not find-and-replace.** It updates XML doc comments, string literals, and partial declarations that a text search misses.
- **The IDE's light-bulb quick actions are real refactorings** — they can introduce a `using`, a null check, or an `await` that you did not write deliberately. Read the diff.
- **Code cleanup (`Ctrl+K, Ctrl+E`) is worth knowing** — it applies the configured style fixes across a file or solution, which is the fast way to normalise a legacy file.
- **Do not let an auto-generated `catch` or null-forgiving `!` land unreviewed.** Both suppress information rather than resolving it.

---

## 7. Testing

- **Use the IDE test runner for the inner loop, `dotnet test` for everything else.** The runner is genuinely better for stepping through a single failing test; it is not a substitute for a headless run.
- **`xUnit` v3 or NUnit v4 with `Microsoft.NET.Test.Sdk`;** MSTest is supported and maintained but has a smaller ecosystem in new projects.
- **Coverlet or the built-in `CollectCoverage` in the SDK** for coverage. Report coverage in CI, not in the IDE run.
- **A failing test that only fails in the IDE is usually an execution-directory or parallelism difference.** Check `runtimeconfig.json` and whether the test project has a `Directory.Build.props` the IDE picked up.
- **Keep tests in a separate project with a project reference, never a folder reference.** A folder reference drags the app's `Program.cs` and its dependencies into the test assembly.

---

## 8. CLI Parity

- **If `dotnet build` fails, the IDE cannot save you.** Fix the CLI first; every IDE mystery is usually a property the CLI does not have.
- **`dotnet test` / `dotnet publish` in CI, always.** Do not script `msbuild.exe` — it is the .NET Framework toolchain, uses a different SDK resolution, and is not present on Linux agents.
- **`dotnet format` is the command-line formatter/analyzer fix** and applies the same `.editorconfig` the IDE reads. Use it in CI to fail on drift.
- **`dotnet watch`** gives you the Hot Reload loop without the IDE, which is how you run a dev loop over SSH or in a container.

```bash
dotnet build --no-incremental
dotnet test  --logger "console;verbosity=normal" --collect:"XPlat Code Coverage"
dotnet format --verify-no-changes
dotnet run --watch
```

---

## 9. Extensions

- **Install extensions with a known publisher and read what they do.** An extension runs arbitrary code in your IDE with your credentials and file access.
- **Pin extension versions** in a `.vsconfig` so a team shares the same tooling.
- **Prefer one good formatter/linter extension over five.** Competing formatters fighting over the same file is a common and very visible failure.
- **Roslyn analyzers usually make an extension unnecessary.** Check for a built-in analyzer before adding one.
- **Do not add an extension to work around a build failure.** Fix the build; the extension becomes a permanent tax nobody remembers agreeing to.

---

## 10. Common Pitfalls

- **Configuration living in the IDE rather than `Directory.Build.props`**, so CI builds something different.
- **Editing a `.sln` by hand on a large solution** — merge conflicts in `.sln` are miserable; use `.slnx` or a generator.
- **A missing `global.json`**, so the developer and CI silently resolve different SDKs.
- **Relying on "startup project", which is meaningless outside the IDE.**
- **Commits of `bin/`, `obj/`, or `.vs/`** — enormous diffs and machine-specific state.
- **Hot Reload applied to a change it cannot support**, which either fails silently or needs a restart anyway.
- **Hand-written exception filters left on permanently**, making debugging genuinely painful.
- **`msbuild.exe` in CI scripts** instead of `dotnet build`, failing on Linux agents.
- **Warnings treated as errors locally but not in CI** (or the reverse), so the signal differs by environment.
- **Analyzer severity set in Error List Options** instead of `.editorconfig`, so the rules do not travel.
- **A folder reference from the test project** pulling the app's entry point into the test assembly.
- **`AnyCPU` published as a portable app** with no runtime available on the target machine.
- **Debug configuration shipped** — no optimisation, symbols and stack frames intact for anyone.

---

## General Rules of Thumb

- `Directory.Build.props` and `Directory.Packages.props` for anything shared; the IDE is a view, not the source of truth.
- `global.json` pinning the SDK; explicit `RuntimeIdentifier` when publishing.
- Roslyn analyzers and `.editorconfig` for rules, so they apply in CI as well as locally.
- Hot Reload for iteration, with the knowledge that signature and `static` changes need a restart.
- `dotnet build` / `test` / `format` in CI; `msbuild.exe` never.
- Test project references, not folder references; one project per deployable unit.
- `.vs`, `bin`, `obj` ignored; extension versions pinned in `.vsconfig`.
- Rider or Community is a legitimate choice — not every project needs the paid tier.

---

## Quick-Start Checklist

- [ ] `global.json` committed, SDK pinned with an explicit `rollForward` policy
- [ ] `Directory.Build.props` holds `Nullable`, `LangVersion`, and warning settings
- [ ] Central Package Management enabled if the solution has more than a few dependencies
- [ ] `ContinuousIntegrationBuild` and `TreatWarningsAsErrors` set from a `CI` condition
- [ ] `RuntimeIdentifier` explicit wherever an app is published
- [ ] Analyzer severity configured in `.editorconfig`, not in Error List Options
- [ ] Hot Reload verified for the project type; restart-only changes documented
- [ ] Exception breakpoints scoped to specific types, or disabled outside diagnosis
- [ ] Tests in their own project with a `ProjectReference`
- [ ] `dotnet test --collect:"XPlat Code Coverage"` and `dotnet format --verify-no-changes` in CI
- [ ] No `msbuild.exe` in any CI or build script
- [ ] `.vs/`, `bin/`, `obj/` in `.gitignore`; `.vsconfig` pinning extensions
- [ ] Release build verified as Release, with symbols handled deliberately
