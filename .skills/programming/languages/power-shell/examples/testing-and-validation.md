# PowerShell Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `Set-StrictMode -Version Latest` + `$ErrorActionPreference = 'Stop'` up top
- [ ] Full cmdlet/named-parameter calls; approved verbs; no aliases
- [ ] Double-quoted with `${}`/`$(...)`; single-quoted literals; here-strings for templates
- [ ] Advanced functions with `[CmdletBinding()]`, typed params, `process {}`
- [ ] `[pscustomobject]` structured output; filter left/format right
- [ ] `try/catch` + `-ErrorAction Stop`; `throw` with context; no empty catches
- [ ] `ValueFromPipeline` for pipeline input; JSON via ConvertFrom/ToJson

## Example

A team applying **Quick-Start Checklist** to a PowerShell Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `Set-StrictMode -Version Latest` + `$ErrorActionPreference = 'Stop'` up top**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for powershell-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
