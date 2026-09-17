# Insomnia: Worked Scenario

Best practices for Insomnia — Git-sync'd collections and environments as files, templating, request tests, and design-first API workflows. Use when designing, organising, or automating API requests and tests.

## Scenario

A project needs to apply **insomnia-best-practices** to a real design or implementation decision. Start from this context: Insomnia is an open-source API client with Git sync, a request designer, and test scripting on the same model as Postman. Its distinguishing feature is **designed API documents**: you can build a resource by describing its fields, and Insomnia derives the requests, environment variables, and mock responses from that description. Practical Insomnia work is about **keeping collections in Git as reviewable files, using the design-first workflow where it fits, and turning requests into executable tests**. Peers are covered in postman.md and bruno.md. _Verified against Insomnia's 2026 releases (v11+). The Git-sync file layout and the design-first feature have been stable for several major versions._

## Apply the guidance

- **Insomnia is designed to live in Git** — a collection directory with YAML files per request, committed and reviewed like source. This is its main argument over a client whose collections live in an account.
- **Point Git sync at a dedicated folder in the repo** (`insomnia/`) and let the team work through it, so a request change is a pull request.
- **Environment files are committed with placeholder values; secrets are never committed.** A token in a committed environment file is an incident, exactly as in any client.
- **Enable sync for the workspace, not per collection,** so a new teammate gets everything by cloning and pointing at the repo.

## Expected outcome

Choose an approach that follows the skill’s recommendations, fits the project constraints, and can be reviewed against its quality and safety requirements.

## Source

Based on the guidance in [SKILL.md](../SKILL.md).
