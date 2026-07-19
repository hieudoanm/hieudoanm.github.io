# Electron Best Practices: Workflow Checklist

A practical run sheet for applying [Electron Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Electron **latest stable**
- [ ] 1. Core Stack: Node.js **LTS**
- [ ] 2. Project Structure: **Clear separation** — main process, renderer process, and preload scripts
- [ ] 2. Project Structure: **IPC organization** — organize IPC handlers by domain
- [ ] 3. Main Process: **Entry point** — main process entry point:
- [ ] 3. Main Process: **Window management** — manage window lifecycle:
- [ ] 4. IPC Communication: **Context isolation** — use preload scripts for secure IPC:
- [ ] 4. IPC Communication: **IPC handlers** — handle IPC in main process:
- [ ] 5. Security: **Context isolation** — always enable context isolation:
- [ ] 5. Security: **Disable node integration** — never enable node integration in renderer

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
