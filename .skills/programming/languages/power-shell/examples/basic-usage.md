# PowerShell Best Practices: Basic Usage

Best practices for writing PowerShell — the conventions for Windows and cross-platform scripting, DSC, and CI automation. Use when writing, structuring, or reviewing PowerShell — covers script safety, cmdlets over aliases, quoting, functions, error handling, the pipeline, and linting.

## Scenario

Use this example as a starting point when applying **powershell-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Script Safety** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```powershell
[CmdletBinding()]
param()
Set-StrictMode -Version Latest
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
