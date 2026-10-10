# Bruno: 1. Files in the Repository

## Scenario

A project is working on **1. files in the repository** for Bruno. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **The collection is a folder of `.bru` files in the repo** — committed, diffed, and reviewed like any other source. This is the reason to use Bruno over a client that stores collections in an account.
- **Keep it in a dedicated folder** (`bruno/` or `api/`) with the environments beside it, so the whole API surface is one reviewable path.
- **No account and no sync means no lock-in and no secrets in a vendor's database** — an environment file is a local, gitignored file with the real values.
- **Commit the environment templates; gitignore the populated ones.** A committed live token is an incident, as in any client.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Files in the Repository** section of [SKILL.md](../SKILL.md).
