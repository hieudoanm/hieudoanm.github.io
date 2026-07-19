# Ubuntu Best Practices: 1. Release Model

## Scenario

A project is working on **1. release model** for Ubuntu Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Two release channels**: LTS every two years in April (5 years standard, 10–12 with Ubuntu Pro), and interim releases in April/October for 9 months. Only deploy LTS to production.
- **LTS → LTS upgrades go through `do-release-upgrade`**, provided by `update-manager-core`. It is deliberately conservative and interactive, and it wants a clean machine first.
- **An LTS ships one kernel and gains newer ones via HWE.** If a fresh CPU is unsupported, it is a kernel problem, not a "we need a newer distro" problem.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Release Model** section of [SKILL.md](../SKILL.md).
