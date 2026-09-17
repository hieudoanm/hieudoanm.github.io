# PowerShell Best Practices: 5. Error Handling

## Source guidance

This example applies the **5. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`try { } catch { }` with `-ErrorAction Stop` or `$PSItem`** — the explicit error contract:
- **`-ErrorAction Stop` on the cmdlet that can fail; never a naked `try { }` with default `Continue`.**
- **Distinguish `ErrorActionPreference`, `-ErrorAction`, `trap`, and `throw`** — pick `try/catch` + `Stop`, the readable default.
- **`Write-Error` vs `throw`** — `Write-Error` writes a non-terminating error record; `throw` exits the function/script. Use `throw` at boundaries you own.
- **No swallowing** — an empty `catch {}` hides the cause; convert and rethrow with context attached.

## Example

```powershell
try {
    $config = Get-Content $path -Raw -ErrorAction Stop | ConvertFrom-Json
}
catch {
    throw "could not read config: $($_.Exception.Message)"
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for powershell-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
