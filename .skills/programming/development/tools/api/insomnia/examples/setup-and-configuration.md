# Insomnia: 1. Git Sync: Collections as Files

## Scenario

A project is working on **1. git sync: collections as files** for Insomnia. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Insomnia is designed to live in Git** — a collection directory with YAML files per request, committed and reviewed like source. This is its main argument over a client whose collections live in an account.
- **Point Git sync at a dedicated folder in the repo** (`insomnia/`) and let the team work through it, so a request change is a pull request.
- **Environment files are committed with placeholder values; secrets are never committed.** A token in a committed environment file is an incident, exactly as in any client.
- **Enable sync for the workspace, not per collection,** so a new teammate gets everything by cloning and pointing at the repo.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **1. Git Sync: Collections as Files** section of [SKILL.md](../SKILL.md).
