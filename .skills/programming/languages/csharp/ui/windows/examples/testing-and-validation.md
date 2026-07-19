# Windows App Development: 8. Testing

## Scenario

A project is working on **8. testing** for Windows App Development. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Unit-test ViewModels and services on the plain .NET test project** with fakes for repositories and HTTP. Most of an app's logic lives there and none of it needs a window.
- **`Microsoft.Testing.Platform` is the modern runner.** Set `EnableMSTestRunner=true` and `GenerateTestingPlatformEntryPoint=false` so WinUI keeps ownership of the entry point.
- **Build the in-process UI test app unpackaged** — `WindowsPackageType=None`, `EnableMsixTooling=false`. It needs no package registration and no Developer Mode, and it is the supported path.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **8. Testing** section of [SKILL.md](../SKILL.md).
