# Rider: Basic Usage

Best practices for working in Rider — .slnx solutions, ReSharper's analysis engine, cross-platform .NET debugging, the AI Assistant and Junie agent, and shared conventions with Visual Studio. Use when setting up, debugging, or refactoring C#/.NET in Rider.

## Scenario

Use this example as a starting point when applying **rider-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Project & Solution Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```text
global.json                    # SDK pin
Directory.Build.props          # Nullable, LangVersion, TreatWarningsAsErrors
Directory.Packages.props       # central package management
MyApp.slnx
src/MyApp.Api/
src/MyApp.Core/
tests/MyApp.Tests/
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
