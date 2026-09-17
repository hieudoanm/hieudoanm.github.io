# Workflow notes

Focused reference for **powershell-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
