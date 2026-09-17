# Visual Studio: Validation Plan

Use this plan to verify work guided by [Visual Studio](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Startup cost is dominated by solution size and analyzer work**, not the IDE itself. A solution that takes minutes to load is a solution with too many projects or too many analyzers
- [ ] **Disable unused workload components and extensions** at install time. Every installed component is loaded whether or not you use it
- [ ] **EnableNETAnalyzers defaults on for modern SDKs.** Tune the rule set with an .editorconfig rather than suppressing warnings one at a time in the UI
- [ ] **Turn off "Restore on build" and background IntelliSense if they are fighting you**, but understand that you are trading correctness for speed
- [ ] **Solution filters (.slnf) are the right answer for large solutions** — they load a subset without restructuring the solution
- [ ] **If a build is slow, measure before tuning.** dotnet build -bl produces a binary log readable by MSBuild's structured log viewer, and it will name the actual bottleneck
- [ ] **Use the IDE test runner for the inner loop, dotnet test for everything else.** The runner is genuinely better for stepping through a single failing test; it is not a substitute for a headless run
- [ ] **xUnit v3 or NUnit v4 with Microsoft.NET.Test.Sdk;** MSTest is supported and maintained but has a smaller ecosystem in new projects
- [ ] **Coverlet or the built-in CollectCoverage in the SDK** for coverage. Report coverage in CI, not in the IDE run
- [ ] **A failing test that only fails in the IDE is usually an execution-directory or parallelism difference.** Check runtimeconfig.json and whether the test project has a Directory.Build.props the IDE picked up

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
