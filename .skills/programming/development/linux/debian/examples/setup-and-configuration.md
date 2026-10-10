# Debian Best Practices: 1. The Release Lifecycle

## Scenario

A project is working on **1. the release lifecycle** for Debian Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`stable` is a moving target; codenames are frozen.** A new stable appears roughly every two years, _when the release team signs off_, not on a calendar. Bookworm (12) and Bullseye (11) are still supported alongside Trixie.
- **Three suites per release**: `trixie` (stable), `trixie-updates`, and `trixie-security` from `security.debian.org`. All three belong in your sources list.
- **`forky` is `testing`** — packages that have passed their own tests but not yet the full stable criteria. `sid` is `unstable`, and `experimental` is a fourth, non-autoremovable suite.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. The Release Lifecycle** section of [SKILL.md](../SKILL.md).
