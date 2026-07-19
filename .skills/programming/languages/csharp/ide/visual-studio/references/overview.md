# Overview

Focused reference for **visual-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Visual Studio

Visual Studio is the full-featured Windows IDE: Roslyn compilation and IntelliSense, the designer, a real debugger with Hot Reload, profilers, and a test runner. It is also the heaviest tool in the .NET ecosystem, and its main source of friction is that **it stores configuration in places CI never reads**. Practical Visual Studio work is about **keeping settings in project files, treating the IDE as a view over MSBuild, and not letting a solution-only setting become a production difference**. Language rules live in csharp.md and dotnet.md.

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
