# Renovate: 4. Configuration Hygiene

## Scenario

A project is working on **4. configuration hygiene** for Renovate. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **The config is a reviewable file, so put it in the repository** (`renovate.json`, `.renovaterc.json`, or `renovate.json5`) and let it change through a PR like anything else.
- **Start from `config:recommended`** and add rules; a hand-built config misses defaults that matter.
- **Use the Dependency Dashboard** (`:dependencyDashboard`) so pending updates are visible instead of silently queued.
- **Pin the bot's own version** if the platform allows it, so a bot change does not alter the policy without review.
- **Validate the schema after every edit** — Renovate ignores unknown keys silently, and a typo means a rule that does not run.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Configuration Hygiene** section of [SKILL.md](../SKILL.md).
