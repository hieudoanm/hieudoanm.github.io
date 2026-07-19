# Linux Mint Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Linux Mint Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Edition (Cinnamon / MATE / XFCE / LMDE) chosen deliberately at install
- [ ] Update Manager used for all updates; `apt upgrade` reserved for reading with `apt list --upgradable`
- [ ] Refresh policy configured so the certification queue is respected
- [ ] Timeshift scheduled snapshots enabled, with a retention limit and free space confirmed
- [ ] A real, tested backup exists for anything timeshift does not cover (`/home`)
- [ ] Third-party repositories purged before any release upgrade
- [ ] `mintupgrade check` run, then `mintupgrade` one major version at a time

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
