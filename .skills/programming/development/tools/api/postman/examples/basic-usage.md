# Postman: Basic Usage

Best practices for Postman — collections and environments as code, variables and scoping, contract testing with schema validation, and CI-friendly Newman runs. Use when designing, organising, or automating API testing.

## Scenario

Use this example as a starting point when applying **postman-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Variables and Scoping** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "name": "Staging",
  "values": [
    { "key": "baseUrl", "value": "https://staging.example.com", "enabled": true },
    { "key": "userId", "value": "", "enabled": true }
  ]
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
