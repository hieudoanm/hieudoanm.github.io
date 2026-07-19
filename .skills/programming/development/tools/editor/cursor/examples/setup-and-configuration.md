# Cursor: Overview

## Scenario

A project is working on **overview** for Cursor. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Cursor is a VS Code fork with AI integrated into the editor: inline completion, a chat that can read the project, and an agent mode that plans and applies multi-file changes. Its power is real; its failure mode is also real — **a plausible-looking diff that silently drops an edge case, and an editor whose default behaviour is to write code you did not ask it to write**. Practical Cursor work is about **encoding the project's conventions in a rules file, treating every AI change as unreviewed code, and deciding deliberately what leaves your machine**. Editor settings conventions are in vscode.md.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
