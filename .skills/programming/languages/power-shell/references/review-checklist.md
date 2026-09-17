# Review checklist

Focused reference for **powershell-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
