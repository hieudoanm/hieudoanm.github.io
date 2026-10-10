# PowerShell Best Practices: Workflow Checklist

A practical run sheet for applying [PowerShell Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Script Safety: **Set-StrictMode -Version Latest** near the top — undefined variables and property accesses become errors:
- [ ] 1. Script Safety: **$ErrorActionPreference = 'Stop'** makes cmdlet errors terminating by default (nothing silently continues)
- [ ] 2. Cmdlets over Aliases, Verbs over Shortcuts: **Use full cmdlet names (Get-ChildItem, Remove-Item) and -Verbose names over aliases (gci, rm)** — readable by reviewers and AI, portable:
- [ ] 2. Cmdlets over Aliases, Verbs over Shortcuts: **Named parameters over positional** — self-documenting call sites; positional only where the contract is obvious
- [ ] 3. Quoting & Expansion: **Doubles interpolate, singles don't** — "...$path..." vs 'literal'; unquoted strings invite hidden globbing:
- [ ] 3. Quoting & Expansion: **${...} for variable names with special chars** and $env:VAR for environment reads
- [ ] 4. Functions & Advanced Functions: **Name functions with approved verb + singular noun** (Get-BuildConfig, Test-PortOpen), no abbreviations
- [ ] 4. Functions & Advanced Functions: **Advanced functions with [CmdletBinding()] and typed param blocks:**
- [ ] 5. Error Handling: **try { } catch { } with -ErrorAction Stop or $PSItem** — the explicit error contract:
- [ ] 5. Error Handling: **-ErrorAction Stop on the cmdlet that can fail; never a naked try { } with default Continue.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
