# PowerShell Best Practices: 2. Cmdlets over Aliases, Verbs over Shortcuts

## Source guidance

This example applies the **2. Cmdlets over Aliases, Verbs over Shortcuts** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use full cmdlet names (`Get-ChildItem`, `Remove-Item`) and `-Verbose` names over aliases (`gci`, `rm`)** — readable by reviewers and AI, portable:
- **Named parameters over positional** — self-documenting call sites; positional only where the contract is obvious.
- **Approved verbs only** (`Get-`, `New-`, `Set-`, `Remove-`, `Test-`, `Add-`) — function names must read as intent.
- **`Where-Object`/`Select-Object`/`Sort-Object` over pipeline-filtering in `foreach`** — filter left, format right:
- **Skip `Write-Host`** — it's for user display; `Write-Output`/return for data (a `script:` value accessible or a param `[ref]` for coordination).

## Example

```powershell
Get-ChildItem -Path . -Filter "*.json" -Recurse
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for powershell-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
