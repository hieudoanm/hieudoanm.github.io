# Implementation notes

Focused reference for **visual-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
