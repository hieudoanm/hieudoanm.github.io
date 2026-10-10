# Biome: 2. Configuration

## Scenario

A project is working on **2. configuration** for Biome. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Biome configures through `biome.json` / `biome.jsonc` only.** There is no JavaScript config file; a `biome.config.js` will be ignored.
- **Always set `$schema`** to the installed version. It gives editor autocompletion and config validation, and it is the fastest way to discover new options.
- **Enable VCS integration** (`"vcs": { "clientKind": "git", "useIgnoreFile": true }`) so Biome honours `.gitignore` instead of descending into `node_modules` and `dist`.
- **Set `files.ignoreUnknown: true`** so Biome skips binaries and unsupported file types rather than warning on every one.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Configuration** section of [SKILL.md](../SKILL.md).
