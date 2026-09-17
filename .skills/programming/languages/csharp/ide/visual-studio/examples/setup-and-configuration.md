# Visual Studio: 3. Build Configuration

## Source guidance

This example applies the **3. Build Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **The IDE is a view over MSBuild.** If `dotnet build` and the IDE disagree, the cause is almost always a property the IDE set but CI does not — environment variables, user-level `.props`, or a machine-wide import.
- **Put shared properties in `Directory.Build.props`**, not by editing each `.csproj`. `Directory.Build.targets` for targets. They are discovered by walking up from the project directory.
- **Treat `TreatWarningsAsErrors` as CI-only if it is noisy locally**, via a condition on `Configuration` or `$(ContinuousIntegrationBuild)`.

## Example

This excerpt is from the cited **3. Build Configuration** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for visual-studio-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
