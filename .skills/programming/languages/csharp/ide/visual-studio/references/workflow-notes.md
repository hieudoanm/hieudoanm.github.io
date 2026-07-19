# Workflow notes

Focused reference for **visual-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
