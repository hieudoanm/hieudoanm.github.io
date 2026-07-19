# PowerShell Best Practices: Starter Template

A reusable starting point derived from the **4. Functions & Advanced Functions** section of [PowerShell Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```powershell
function Get-BuildConfig {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, Position = 0)]
        [string] $Path,
        [int] $TimeoutSeconds = 30
    )
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
