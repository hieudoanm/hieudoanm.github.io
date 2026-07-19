# Snyk: Basic Usage

Best practices for Snyk — Code, IaC, and container scanning, the difference between a finding and a reachable one, severity policy, and fix workflow ownership. Use when setting up, triaging, or acting on dependency vulnerabilities.

## Scenario

Use this example as a starting point when applying **snyk-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Triage: Reachability First** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "ignore": [
    {
      "id": "SNYK-JS-1234",
      "paths": ["tests/**", "**/*.test.ts"],
      "reason": "Test-only dependency, not shipped; pinned until the suite is migrated",
      "expires": "2027-01-15"
    }
  ]
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
