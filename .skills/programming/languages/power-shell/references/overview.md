# Overview

Focused reference for **powershell-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
