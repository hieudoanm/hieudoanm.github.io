# Review checklist

Focused reference for **visual-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
