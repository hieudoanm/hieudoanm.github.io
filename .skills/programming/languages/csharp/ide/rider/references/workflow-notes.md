# Workflow notes

Focused reference for **rider-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
