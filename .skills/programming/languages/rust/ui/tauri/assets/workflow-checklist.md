# Tauri Best Practices: Workflow Checklist

A practical run sheet for applying [Tauri Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Rust **latest stable**
- [ ] 1. Core Stack: Tauri **2.x** (latest stable)
- [ ] 2. Project Structure: **Clear separation** — Rust backend in src-tauri/, web frontend in src/
- [ ] 2. Project Structure: **Command modules** — organize Tauri commands by domain
- [ ] 3. Tauri Commands: **Commands bridge frontend and backend** — define Rust functions callable from frontend:
- [ ] 3. Tauri Commands: **Register commands in main** — add commands to the Tauri app:
- [ ] 4. State Management: **Use Tauri's state management** — share state across commands:
- [ ] 4. State Management: **Initialize state in main** — create and inject state:
- [ ] 5. Frontend Integration: **Invoke commands from frontend** — use Tauri's API:
- [ ] 5. Frontend Integration: **Type safety** — generate TypeScript types from Rust commands:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
