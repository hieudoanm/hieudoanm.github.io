# Windows App Development: Basic Usage

Best practices for building Windows desktop apps with the Windows App SDK and WinUI 3 — architecture, MVVM, x:Bind, packaging, windowing, and testing. Use when creating, structuring, or reviewing a Windows app in C#.

## Scenario

Use this example as a starting point when applying **windows-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Version & Targeting** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```xml
<PropertyGroup>
  <TargetFramework>net10.0-windows10.0.26100.0</TargetFramework>
  <SupportedOSPlatformVersion>10.0.19041.0</SupportedOSPlatformVersion>
  <UseWinUI>true</UseWinUI>
</PropertyGroup>
<ItemGroup>
  <PackageReference Include="Microsoft.WindowsAppSDK" Version="2.4.0" />
</ItemGroup>
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
