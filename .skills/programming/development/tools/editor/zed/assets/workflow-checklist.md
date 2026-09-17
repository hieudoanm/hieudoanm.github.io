# Zed: Workflow Checklist

A practical run sheet for applying [Zed](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Settings, Not User Settings: **Zed's canonical project config is .zed/settings.json**, committed. It holds languages, linting, formatting, and file-specific rules in one reviewable file
- [ ] 1. Project Settings, Not User Settings: **A shared project is opened as a project, not a folder** (File → Open Project), so the .zed/ directory is picked up. Opening a raw folder leaves your team without the config you wrote
- [ ] 2. Extensions & Language Servers: **Prefer the language's own tool over an editor extension,** for the same reason as in VS Code: the CLI is what CI runs, so it is the authority
- [ ] 2. Extensions & Language Servers: **Zed's extension set is intentionally small; resist adding several for one job.** Two formatters or two linters for the same language will fight, and the winner depends on load order
- [ ] 3. Key Bindings: **Zed's defaults are opinionated and good; the mistake is remapping piecemeal** until nobody can predict a shortcut. Start from default, and change only what genuinely conflicts with your muscle memory
- [ ] 3. Key Bindings: **Keep a keymap.json if you do customise,** and commit it, so the team is not debugging each other's shortcuts
- [ ] 4. Performance: **Zed is fast on large files by design; the usual cause of a slowdown is an extension, not the editor.** Disable extensions one at a time to find it rather than assuming the project is too big
- [ ] 4. Performance: **Project-scoped syntax trees and language servers do real work on open**; a very large monorepo benefits from opening the root once rather than several nested projects
- [ ] 5. Collaboration & Git: **Zed has a built-in collaborative editing mode** over its own transport — good for pairing on a file, not a substitute for reviewing a branch
- [ ] 5. Collaboration & Git: **The Git integration is a convenience, not a replacement for the CLI.** For anything that will end up in history — rebases, history surgery, a bisect — use the terminal, where the operations are explicit and reviewable

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
