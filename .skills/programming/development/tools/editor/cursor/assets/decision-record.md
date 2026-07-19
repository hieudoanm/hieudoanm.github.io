# Cursor: Decision Record

Use this record when applying [Cursor](../SKILL.md) to a concrete project decision.

## Context

Best practices for working in the Cursor editor — rules files for AI behaviour, reviewing AI diffs as code review, agent mode boundaries, and privacy of repository indexing. Use when configuring, or working with AI-assisted editing in Cursor.

Cursor is a VS Code fork with AI integrated into the editor: inline completion, a chat that can read the project, and an agent mode that plans and applies multi-file changes. Its power is real; its failure mode is also real — **a plausible-looking diff that silently drops an edge case, and an editor whose default behaviour is to write code you did not ask it to write**. Practical Cursor work is about **encoding the project's conventions in a rules file, treating every AI change as unreviewed code, and deciding deliberately what leaves your machine**. Editor settings conventions are in vscode.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Why a Fork Changes the Rules
- [ ] 2. Rules Files
- [ ] 3. Agent Mode Boundaries
- [ ] 4. Reviewing AI Diffs
- [ ] 5. Privacy & Indexing
- [ ] 6. When Not to Use It
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
