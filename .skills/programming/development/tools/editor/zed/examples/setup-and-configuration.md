# Zed: Overview

## Scenario

A project is working on **overview** for Zed. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Zed is a high-performance native code editor: GPU-rendered, fast on large files, and built around language servers with a small, curated default extension set. Its trade-off against VS Code is deliberate — **fewer extensions and a smaller surface, in exchange for speed and a settings model that is committed as a project file**. Practical Zed work is about **using Zed's own project settings rather than per-user config, keeping the language server as the source of truth for diagnostics, and not reaching for an extension where the CLI does the job**. VS Code conventions are in vscode.md; Neovim in neovim.md.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
