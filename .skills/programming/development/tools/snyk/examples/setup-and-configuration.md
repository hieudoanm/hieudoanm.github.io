# Snyk: 4. Infrastructure as Code

## Scenario

A project is working on **4. infrastructure as code** for Snyk. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`snyk iac` on Terraform/Kubernetes/CloudFormation is high-yield and low-noise,** because a misconfiguration is a fact about the file, not a judgement call. Fix it in the template, not in the console.
- **State files drift from templates** — a manual console change is invisible to IaC scanning and survives until the next apply. Treat a finding in IaC as possibly "the template says one thing and reality says another."
- **A policy exception for an intentional public resource** belongs in the template as a comment and in `.snyk` as an ignore, so the next scan and the next reviewer both see it.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Infrastructure as Code** section of [SKILL.md](../SKILL.md).
