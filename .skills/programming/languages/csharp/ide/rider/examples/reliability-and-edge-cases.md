# Rider: Overview

## Scenario

A project is working on **overview** for Rider. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Rider is JetBrains' cross-platform .NET IDE, built on the same ReSharper analysis engine as Visual Studio's ReSharper extension. It runs on Windows, macOS, and Linux with a consistent UI, and it is the only first-class .NET IDE on non-Windows platforms. Its main advantage over Visual Studio is **uniform behaviour across operating systems**; its main risk is **Rider-specific settings that quietly diverge from the build**. Practical Rider work is about **treating MSBuild as the build, not Rider, and committing only the settings that belong to the project**. Language rules live in csharp.md and dotnet.md.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
