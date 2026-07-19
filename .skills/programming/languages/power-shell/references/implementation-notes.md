# Implementation notes

Focused reference for **powershell-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`-ErrorAction Stop` on the cmdlet that can fail; never a naked `try { }` with default `Continue`.**
- **Distinguish `ErrorActionPreference`, `-ErrorAction`, `trap`, and `throw`** — pick `try/catch` + `Stop`, the readable default.
- **`Write-Error` vs `throw`** — `Write-Error` writes a non-terminating error record; `throw` exits the function/script. Use `throw` at boundaries you own.
- **No swallowing** — an empty `catch {}` hides the cause; convert and rethrow with context attached.

---

## 6. Pipeline & Input

- **`process {}` blocks for pipeline input in advanced functions** — each item processed per arrive; no `$Input` confusion:

```powershell
function Get-ComputedLength {
    [CmdletBinding()]
    param([Parameter(ValueFromPipeline)][string]$Path)
    process { Get-Item $Path | Select-Object FullName, Length }
}
```

- **`ValueFromPipeline` + `ValueFromPipelineByPropertyName` where the incoming object shape maps by name.**
- **`Select-Object -ExpandProperty`/`-Property` shape data deliberately; `ConvertTo-Json`/`ConvertFrom-Json` for serialization boundaries.**
- **Pipeline = live objects, not text** — never parse `out-string`; pass typed objects end to end.
- **Volumes**: use `ForEach-Object -Parallel` (PowerShell 7) or `Start-Job`/`Start-ThreadJob` for independent work; respect the workspace (`runspace`).

---

## 7. Conventions & Style

- **Consistent casing and layout enforced by PSScriptAnalyzer ruleset**:

```powershell
$rules = @{
    PSAlignAssignmentStatement = $true
    PSUseSingularNouns         = $true
    PSUseShouldProcessForStateChangingFunctions = $true
}
```

- **Comment-based help** (`<# .SYNOPSIS .PARAMETER .EXAMPLE #>`) on every function — `Get-Help` and IDE docs come free.
- **Variables PascalCase by naming convention**; `$script:` scope for shared state, never globals leak.
- **Modules over dot-sourced scripts** — a `.psm1` with an `Export-ModuleMember` contract is the reusable boundary.
- **`about_*` conventions and `Get-Help` include examples — an unimplemented help block is a spec for behavior.**

---

## 8. Security

- **Prefer `-Credential`/secret interfaces over plaintext** — run with least privilege; gate with `RequiredModules`/`Requires` in the header (`#Requires -Version 7.0 -Modules Pester`).
- **Constrain user input** — `ValidateSet`/`ValidateScript`/typed params reject hostile strings:

```powershell
param([ValidateSet('dev', 'stage', 'prod')][string]$Environment)
```
