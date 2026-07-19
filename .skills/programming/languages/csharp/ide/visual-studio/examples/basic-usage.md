# Visual Studio: Basic Usage

Best practices for working in Visual Studio 2026 — solution structure, .slnx, MSBuild configuration, Roslyn analyzers, Hot Reload, the built-in test runner, and dotnet CLI parity. Use when setting up or debugging a C#/.NET project in Visual Studio or Rider.

## Scenario

Use this example as a starting point when applying **visual-studio-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Build Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
