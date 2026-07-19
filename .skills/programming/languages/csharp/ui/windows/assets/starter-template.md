# Windows App Development: Starter Template

A reusable starting point derived from the **2. Version & Targeting** section of [Windows App Development](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
