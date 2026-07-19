# Volta Best Practices: 5. Compat & Troubleshooting

## Scenario

A project is working on **5. compat & troubleshooting** for Volta Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Ensure the `volta` block and `engines` don't disagree — `engines` is a check, `volta` is the enforcer.**
- **Proxy/corporate registries: `VOLTA_FEATURE_PNPM` etc. as needed; mirrors for offline.**
- **Migrate from nvm/system-managed: uninstall old, `volta pin` then `volta install`.**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Compat & Troubleshooting** section of [SKILL.md](../SKILL.md).
