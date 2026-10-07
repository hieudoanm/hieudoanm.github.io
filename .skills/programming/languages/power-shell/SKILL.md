---
name: powershell-best-practices
description: Best practices for writing PowerShell — the conventions for Windows and cross-platform scripting, DSC, and CI automation. Use when writing, structuring, or reviewing PowerShell — covers script safety, cmdlets over aliases, quoting, functions, error handling, the pipeline, and linting.
---

# PowerShell Best Practices

PowerShell is an object-pipeline language — cmdlets emit objects, and `|` passes them without text-parsing liability. Practical PowerShell leans on **cmdlets and named parameters over aliases and positional magic, `-ErrorAction`/`try-catch` as the explicit error contract**, and **`Set-StrictMode`/`PSScriptAnalyzer` to rescue the interpreter's silence**. The pipeline is the product: filter left, format right, keep types flowing.

---

## 1. Script Safety

- **`Set-StrictMode -Version Latest`** near the top — undefined variables and property accesses become errors:

```powershell
[CmdletBinding()]
param()
Set-StrictMode -Version Latest
```

- **`$ErrorActionPreference = 'Stop'`** makes cmdlet errors terminating by default (nothing silently continues).
- **Declare a `param()` block even for no params** — `CmdletBinding()` enables comment-based help and common parameters.
- **One script = one responsibility + a `process`/`end` entry point**; scripts that do ten things are unfixable teleporters.
- **Every script has `-WhatIf`/`-Confirm` support where it mutates** — via `[CmdletBinding(SupportsShouldProcess)]` and `$PSCmdlet.ShouldProcess()`.

---

## 2. Cmdlets over Aliases, Verbs over Shortcuts

- **Use full cmdlet names (`Get-ChildItem`, `Remove-Item`) and `-Verbose` names over aliases (`gci`, `rm`)** — readable by reviewers and AI, portable:

```powershell
Get-ChildItem -Path . -Filter "*.json" -Recurse
```

- **Named parameters over positional** — self-documenting call sites; positional only where the contract is obvious.
- **Approved verbs only** (`Get-`, `New-`, `Set-`, `Remove-`, `Test-`, `Add-`) — function names must read as intent.
- **`Where-Object`/`Select-Object`/`Sort-Object` over pipeline-filtering in `foreach`** — filter left, format right:

```powershell
Get-Process | Where-Object CPU -gt 10 | Sort-Object CPU -Descending
```

- **Skip `Write-Host`** — it's for user display; `Write-Output`/return for data (a `script:` value accessible or a param `[ref]` for coordination).

---

## 3. Quoting & Expansion

- **Doubles interpolate, singles don't** — `"...$path..."` vs `'literal'`; unquoted strings invite hidden globbing:

```powershell
Write-Output "deploying $env:APP to $server"
```

- **`${...}` for variable names with special chars** and `$env:VAR` for environment reads.
- **`&` call operator for command names in strings** and for `$($var).method` full-binder safety; `[scriptblock]` for simple function dispatch.
- **Subexpression `$(...)` inside double-quoted strings** to embed expression results.
- **Here-strings (`@"..."@`) for multi-line templates** — indentation rules in here-strings are real; use `@'...'@` for templates with `$`.

---

## 4. Functions & Advanced Functions

- **Name functions with approved verb + singular noun** (`Get-BuildConfig`, `Test-PortOpen`), no abbreviations.
- **Advanced functions with `[CmdletBinding()]` and typed param blocks:**

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

- **One function, one output type** — the pipeline contract is the type; an array of `[PSCustomObject]` with consistent keys beats ad-hoc output.
- **`[PSCustomObject]`/`[pscustomobject]` for result records** — PowerShell output IS structured data:

```powershell
[pscustomobject]@{ Name = $name; Status = $status; Elapsed = $sw.Elapsed }
```

- **Return values anywhere; don't sprinkle `return` for flow** — `return` both raises a value AND exits; assign to output softly.

---

## 5. Error Handling

- **`try { } catch { }` with `-ErrorAction Stop` or `$PSItem`** — the explicit error contract:

```powershell
try {
    $config = Get-Content $path -Raw -ErrorAction Stop | ConvertFrom-Json
}
catch {
    throw "could not read config: $($_.Exception.Message)"
}
```

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

- **Never `Invoke-Expression` on untrusted strings** — `iex` on external input is code injection; parse/validate first.
- **Secrets from environment/credential store, never hardcoded** — and `ConvertTo-SecureString`/plugins for the credential channel.
- **Define a defense posture per script** — what runs as admin, what sections decline privilege.

---

## 9. Tooling & CI

- **PSScriptAnalyzer as the lint gate** (equivalent of shellcheck):

```bash
Invoke-ScriptAnalyzer -Path ./scripts -Recurse -Severity Warning
```

- **Pester as the test framework** — contract tests, `Should -Throw`/`-Be`, table-driven:

```powershell
Describe 'Get-BuildConfig' {
    It 'rejects missing file' {
        { Get-BuildConfig -Path 'no.json' -ErrorAction Stop } | Should -Throw
    }
}
```

- **Run tests in CI on every push; `ConvertTo-Json` fixtures deterministic.**
- **`pwsh` (PowerShell 7) as the cross-platform target**; keep Windows PowerShell (5.1) compat only when the deployment demands it.

---

## General Rules of Thumb

- **Objects flow through the pipeline; text is the last resort.**
- **Full cmdlet names, approved verbs, typed parameters — the contract is the name.**
- **`try/catch` + `-ErrorAction Stop` as the explicit error path; never swallow.**
- **`Set-StrictMode` + `$ErrorActionPreference='Stop'` on every script.**
- **Functions mutate only with `-WhatIf`/`-Confirm`.**
- **PSScriptAnalyzer + Pester are part of "done".**

---

## Quick-Start Checklist

- [ ] `Set-StrictMode -Version Latest` + `$ErrorActionPreference = 'Stop'` up top
- [ ] Full cmdlet/named-parameter calls; approved verbs; no aliases
- [ ] Double-quoted with `${}`/`$(...)`; single-quoted literals; here-strings for templates
- [ ] Advanced functions with `[CmdletBinding()]`, typed params, `process {}`
- [ ] `[pscustomobject]` structured output; filter left/format right
- [ ] `try/catch` + `-ErrorAction Stop`; `throw` with context; no empty catches
- [ ] `ValueFromPipeline` for pipeline input; JSON via ConvertFrom/ToJson
- [ ] `ValidateSet`/`ValidateScript` on untrusted input; no `iex` on strings
- [ ] PSScriptAnalyzer clean (Warning+); Pester suite in CI
- [ ] `#Requires` and `-WhatIf`/`-Confirm` where the script mutates