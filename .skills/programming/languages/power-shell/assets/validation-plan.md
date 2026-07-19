# PowerShell Best Practices: Validation Plan

Use this plan to verify work guided by [PowerShell Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Power-shell and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Prefer -Credential/secret interfaces over plaintext** — run with least privilege; gate with RequiredModules/Requires in the header (#Requires -Version 7.0 -Modules Pester)
- [ ] **Constrain user input** — ValidateSet/ValidateScript/typed params reject hostile strings:
- [ ] **Never Invoke-Expression on untrusted strings** — iex on external input is code injection; parse/validate first
- [ ] **Secrets from environment/credential store, never hardcoded** — and ConvertTo-SecureString/plugins for the credential channel
- [ ] **Define a defense posture per script** — what runs as admin, what sections decline privilege

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
