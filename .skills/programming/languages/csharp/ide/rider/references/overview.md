# Overview

Focused reference for **rider-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Rider

Rider is JetBrains' cross-platform .NET IDE, built on the same ReSharper analysis engine as Visual Studio's ReSharper extension. It runs on Windows, macOS, and Linux with a consistent UI, and it is the only first-class .NET IDE on non-Windows platforms. Its main advantage over Visual Studio is **uniform behaviour across operating systems**; its main risk is **Rider-specific settings that quietly diverge from the build**. Practical Rider work is about **treating MSBuild as the build, not Rider, and committing only the settings that belong to the project**. Language rules live in csharp.md and dotnet.md.

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
